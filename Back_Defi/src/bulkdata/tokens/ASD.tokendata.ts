import { ITokenData } from './interface.tokendata';
import {
  ASDkrwclosePrice,
  ASDkrwopenPrice,
  ASDusdopenPrice,
  ASDusdclosePrice,
  dataLength,
} from './bulkdataRow';

export const ASDtokenData: ITokenData[] = dataLength.map((date, index) => ({
  name: 'ASD',
  date: date.toString(),
  dailyOpenPriceKRW: ASDkrwopenPrice[index] || 0,
  dailyEndPriceKRW: ASDkrwclosePrice[index] || 0,
  dailyOpenPriceUSD: ASDusdopenPrice[index] || 0,
  dailyEndPriceUSD: ASDusdclosePrice[index] || 0,
  lastUppdateDate: new Date().toISOString().slice(0, 10),
}));
