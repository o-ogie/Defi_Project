import { TokenValue } from '../../models/tokenValue.model';

export interface ITokenData {
  name?: string;
  date?: string;
  dailyOpenPriceUSD?: number;
  dailyEndPriceUSD?: number;
  dailyOpenPriceKRW?: number;
  dailyEndPriceKRW?: number;
  lastUppdateDate?: string;
}
