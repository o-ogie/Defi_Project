import { Sequelize, Dialect, Model, ModelCtor } from 'sequelize';
import { initializeTokenValue } from './tokenValue.model';
import { initializeContractAddress } from './proposalList.model';
import { initializeDashboard } from './dashboard.model';
import { config } from '../../config';

const env = (process.env.NODE_ENV || 'development') as
  | 'development'
  | 'production';
const dbConfig = config[env].db;

interface IModel extends Model {}
interface IModelStatic extends ModelCtor<IModel> {
  associate?: (models: Record<string, ModelCtor<IModel>>) => void;
}

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: Number(dbConfig.port),
    dialect: dbConfig.dialect as Dialect,
    define: dbConfig.define,
    timezone: dbConfig.timezone,
    dialectOptions: dbConfig.dialectOptions,
    logging: console.log,
  },
);

initializeTokenValue(sequelize);
initializeContractAddress(sequelize);
initializeDashboard(sequelize);

const { models } = sequelize;
for (const modelName of Object.keys(models)) {
  const model = models[modelName] as IModelStatic;
  if (model.associate) {
    model.associate(models);
  }
}

export { sequelize, Sequelize };
