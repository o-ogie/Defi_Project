import { ITokenData } from './interface.tokendata';
import {
  ETHkrwclosePrice,
  ETHkrwopenPrice,
  ETHusdopenPrice,
  ETHusdclosePrice,
  dataLength,
} from './bulkdataRow';

export const ETHtokenData: ITokenData[] = dataLength.map((date, index) => ({
  name: 'ETH',
  date: date.toString().slice(0, 10),
  dailyOpenPriceKRW: ETHkrwopenPrice[index] || 0,
  dailyEndPriceKRW: ETHkrwclosePrice[index] || 0,
  dailyOpenPriceUSD: ETHusdopenPrice[index] || 0,
  dailyEndPriceUSD: ETHusdclosePrice[index] || 0,
  lastUppdateDate: new Date().toISOString().slice(0, 10),
}));
