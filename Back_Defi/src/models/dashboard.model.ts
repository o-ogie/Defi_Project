import { Model, DataTypes, Sequelize } from 'sequelize';

export class Dashboard extends Model {
  public Token!: string;
  public Date!: Date;
  public TotalDeposit!: number;
  public TotalSupply!: number;
  public TotalRewardLp!: number;
}

export const initializeDashboard = (sequelize: Sequelize) => {
  Dashboard.init(
    {
      Token: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      Date: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      TotalDeposit: {
        type: DataTypes.DECIMAL(28, 18),
        allowNull: false,
      },
      TotalSupply: {
        type: DataTypes.DECIMAL(28, 18),
        allowNull: false,
      },
      TotalRewardLp: {
        type: DataTypes.DECIMAL(28, 18),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Dashboard',
    },
  );
  console.log('Ready to Dashboard Model Initialize');
};
