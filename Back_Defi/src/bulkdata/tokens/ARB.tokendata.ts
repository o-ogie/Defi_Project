import { ITokenData } from './interface.tokendata';
import {
  ARBkrwclosePrice,
  ARBkrwopenPrice,
  ARBusdclosePrice,
  ARBusdopenPrice,
  dataLength,
} from './bulkdataRow';

export const ARBtokenData: ITokenData[] = dataLength.map((date, index) => ({
  name: 'ARB',
  date: date.toString(),
  dailyOpenPriceKRW: ARBkrwopenPrice[index] || 0,
  dailyEndPriceKRW: ARBkrwclosePrice[index] || 0,
  dailyOpenPriceUSD: ARBusdopenPrice[index] || 0,
  dailyEndPriceUSD: ARBusdclosePrice[index] || 0,
  lastUppdateDate: new Date().toISOString().slice(0, 10),
}));
