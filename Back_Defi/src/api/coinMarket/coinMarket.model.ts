import axios, { AxiosResponse } from 'axios';
import { config } from '../../../config';

const env: 'development' | 'production' = (process.env.NODE_ENV ||
  'development') as 'development' | 'production';
const coinMarketConfig = config[env].coinMarketCap;

export const getCoinPrice = async (
  symbols: string[],
  currency: string,
): Promise<AxiosResponse> => {
  let apikey = coinMarketConfig.apiKey;
  try {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`;
    const headers = {
      'X-CMC_PRO_API_KEY': apikey,
      Accept: 'application/json',
    };
    return await axios.get(url, {
      headers: headers,
      params: {
        symbol: symbols.join(','),
        convert: currency,
      },
    });
  } catch (e) {
    console.log(
      `This error occurred getCoinPrice from coinMarket.model.ts. The Error message is ${e}`,
    );
    throw e;
  }
};

export const getCoinCurrency = async (): Promise<AxiosResponse> => {
  let apikey = coinMarketConfig.apiKey;
  try {
    const url = 'https://pro-api.coinmarketcap.com/v1/fiat/map';
    const headers = {
      'X-CMC_PRO_API_KEY': apikey,
      Accept: 'application/json',
    };
    return await axios.get(url, {
      headers: headers,
    });
  } catch (e) {
    console.log(
      `This error occurred getCoinCurrency from coinMarket.model.ts. The Error message is ${e}`,
    );
    throw e;
  }
};
