import { Model, DataTypes, Sequelize } from 'sequelize';

export class TokenValue extends Model {
  public name!: string;
  public date!: Date;
  public dailyOpenPriceUSD?: number;
  public dailyEndPriceUSD?: number;
  public dailyOpenPriceKRW?: number;
  public dailyEndPriceKRW?: number;
  public lastUppdateDate?: string;
}

export const initializeTokenValue = (sequelize: Sequelize) => {
  TokenValue.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      dailyOpenPriceUSD: {
        type: DataTypes.DECIMAL(28, 18),
        allowNull: false,
      },
      dailyEndPriceUSD: {
        type: DataTypes.DECIMAL(28, 18),
        allowNull: false,
      },
      dailyOpenPriceKRW: {
        type: DataTypes.DECIMAL(28, 18),
        allowNull: false,
      },
      dailyEndPriceKRW: {
        type: DataTypes.DECIMAL(28, 18),
        allowNull: false,
      },
      lastUppdateDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'TokenPriceHistory',
    },
  );
  console.log('Ready to TokenValue Model Initialize');
};
