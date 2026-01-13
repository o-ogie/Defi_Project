import { Request, Response, NextFunction } from 'express';
import { getCoinPrice, getCoinCurrency } from './coinMarket.model';

export const getCoinPriceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const symbols = ['ETH', 'ARB', 'USDT'];
    const resultUSD = await getCoinPrice(symbols, 'USD');
    const resultKRW = await getCoinPrice(symbols, 'KRW');
    res.json({
      USD: resultUSD.data,
      KRW: resultKRW.data,
    });
  } catch (e) {
    console.log(
      `This error occurred getCoinPriceController from coinMarket.controller.ts. The Error message is ${e}`,
    );
    res.status(500).json({ ErrorEvent: `${e}.message` });
  }
};

export const getCoinCurrencyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const symbols = ['ETH', 'ARB', 'USDT'];
    const resultUSD = await getCoinPrice(symbols, 'USD');
    const resultKRW = await getCoinPrice(symbols, 'KRW');
    res.json({
      USD: resultUSD.data,
      KRW: resultKRW.data,
    });
  } catch (e) {
    console.log(
      `This error occurred getCoinCurrencyController from coinMarket.controller.ts. The Error message is ${e}`,
    );
    res.status(500).json({ ErrorEvent: `${e}.message` });
  }
};
