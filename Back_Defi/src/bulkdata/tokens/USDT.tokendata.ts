import { ITokenData } from './interface.tokendata';
import {
  USDTkrwclosePrice,
  USDTkrwopenPrice,
  USDTusdclosePrice,
  USDTusdopenPrice,
  dataLength,
} from './bulkdataRow';

export const USDTtokenData: ITokenData[] = dataLength.map((date, index) => ({
  name: 'USDT',
  date: date.toString().slice(0, 10),
  dailyOpenPriceKRW: USDTkrwopenPrice[index] || 0,
  dailyEndPriceKRW: USDTkrwclosePrice[index] || 0,
  dailyOpenPriceUSD: USDTusdopenPrice[index] || 0,
  dailyEndPriceUSD: USDTusdclosePrice[index] || 0,
  lastUppdateDate: new Date().toISOString().slice(0, 10),
}));
