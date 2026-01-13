import cron from 'node-cron';
import { TokenValue } from '../../models/tokenValue.model';
import { getCoinPrice } from './coinMarket.model';
import {
  ASDkrwclosePrice,
  ASDkrwopenPrice,
  ASDusdclosePrice,
  ASDusdopenPrice,
  generateASDTokenPrice,
} from '../../bulkdata/tokens/bulkdataRow';

export const PriceUpdate = async () => {
  const timeZone = 'Asia/Seoul';
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const formatter = new Intl.DateTimeFormat('en-US', { ...options, timeZone });
  const parts = formatter.formatToParts(new Date());
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;
  const today = `${year}-${month}-${day}`;

  // 23:59:59 일일 종가
  cron.schedule('59 59 23 * * *', async () => {
    try {
      const symbols = ['ETH', 'ARB', 'USDT'];
      console.log('23:59:59 update prices');
      const resultUSD = await getCoinPrice(symbols, 'USD');
      const resultKRW = await getCoinPrice(symbols, 'KRW');
      for (let symbol of symbols) {
        const [symbolRecord, created] = await TokenValue.findOrCreate({
          where: { name: symbol, date: today },
          defaults: {
            dailyEndPriceUSD: resultUSD.data.data[symbol].quote.USD.price,
            dailyEndPriceKRW: resultKRW.data.data[symbol].quote.KRW.price,
            lastUppdateDate: resultUSD.data.data[symbol].quote.USD.last_updated
              .toString()
              .slice(0, 10),
          },
        });

        if (!created) {
          symbolRecord.dailyEndPriceUSD =
            resultUSD.data.data[symbol].quote.USD.price;
          symbolRecord.dailyEndPriceKRW =
            resultKRW.data.data[symbol].quote.KRW.price;
          symbolRecord.lastUppdateDate = resultUSD.data.data[
            symbol
          ].quote.USD.last_updated
            .toString()
            .slice(0, 10);
          await symbolRecord.save();
        }
      }
    } catch (error) {
      console.error(`Failed to update prices at 23:59:59: ${error}`);
    }
  });

  // 00:00:04 일일 시가
  cron.schedule('04 00 00 * * *', async () => {
    try {
      const symbols = ['ETH', 'ARB', 'USDT'];
      const resultUSD = await getCoinPrice(symbols, 'USD');
      const resultKRW = await getCoinPrice(symbols, 'KRW');
      console.log('00:00:04 update prices');
      for (let symbol of symbols) {
        const [symbolRecord, created] = await TokenValue.findOrCreate({
          where: { name: symbol, date: today },
          defaults: {
            dailyOpenPriceUSD: resultUSD.data.data[symbol].quote.USD.price,
            dailyOpenPriceKRW: resultKRW.data.data[symbol].quote.KRW.price,
            lastUppdateDate: resultUSD.data.data[symbol].quote.USD.last_updated
              .toString()
              .slice(0, 10),
          },
        });

        if (!created) {
          symbolRecord.dailyOpenPriceUSD =
            resultUSD.data.data[symbol].quote.USD.price;
          symbolRecord.dailyOpenPriceKRW =
            resultKRW.data.data[symbol].quote.KRW.price;
          symbolRecord.lastUppdateDate = resultUSD.data.data[
            symbol
          ].quote.USD.last_updated
            .toString()
            .slice(0, 10);
          await symbolRecord.save();
        }
      }
    } catch (error) {
      console.error(`Failed to update prices at 00:00:04: ${error}`);
    }
  });

  // 1분마다 업데이트
  cron.schedule('*/1 * * * *', async () => {
    try {
      const symbols = ['ETH', 'ARB', 'USDT'];
      const resultUSD = await getCoinPrice(symbols, 'USD');
      const resultKRW = await getCoinPrice(symbols, 'KRW');
      const epsilon = 0.0000000001;
      console.log('5 minutes update prices');
      for (let symbol of symbols) {
        const [symbolRecord, created] = await TokenValue.findOrCreate({
          where: { name: symbol, date: today },
        });

        if (!created) {
          if (
            symbolRecord.dailyOpenPriceUSD &&
            Math.abs(symbolRecord.dailyOpenPriceUSD) < epsilon
          ) {
            symbolRecord.dailyOpenPriceUSD =
              resultUSD.data.data[symbol].quote.USD.price;
          }

          if (
            symbolRecord.dailyOpenPriceKRW &&
            Math.abs(symbolRecord.dailyOpenPriceKRW) < epsilon
          ) {
            symbolRecord.dailyOpenPriceKRW =
              resultKRW.data.data[symbol].quote.KRW.price;
          }

          if (
            symbolRecord.dailyEndPriceUSD &&
            Math.abs(symbolRecord.dailyEndPriceUSD) < epsilon
          ) {
            symbolRecord.dailyEndPriceUSD =
              resultUSD.data.data[symbol].quote.USD.price;
          }

          if (
            symbolRecord.dailyEndPriceKRW &&
            Math.abs(symbolRecord.dailyEndPriceKRW) < epsilon
          ) {
            symbolRecord.dailyEndPriceKRW =
              resultKRW.data.data[symbol].quote.KRW.price;
          }

          await symbolRecord.save();
        }
      }
    } catch (error) {
      console.error(`Failed to update prices every 5 minutes: ${error}`);
    }
  });

  // ASD Token 가격 랜덤 업데이트 (1분마다)
  cron.schedule('*/1 * * * *', async () => {
    const symbol = 'ASD';
    const dailyOpenPriceKRW = generateASDTokenPrice(1250, 1450, 18);
    const dailyEndPriceKRW = generateASDTokenPrice(1250, 1450, 18);
    const dailyOpenPriceUSD = generateASDTokenPrice(1.1, 1.3, 18);
    const dailyEndPriceUSD = generateASDTokenPrice(1.1, 1.3, 18);
    console.log('1 minute update ASD prices');
    try {
      // 가격 배열에 추가
      ASDkrwopenPrice.push(dailyOpenPriceKRW);
      ASDkrwclosePrice.push(dailyEndPriceKRW);
      ASDusdopenPrice.push(dailyOpenPriceUSD);
      ASDusdclosePrice.push(dailyEndPriceUSD);

      // DB에 추가
      const [tokenValue, created] = await TokenValue.findOrCreate({
        where: {
          name: symbol,
          date: today,
        },
        defaults: {
          dailyOpenPriceUSD: dailyOpenPriceUSD,
          dailyOpenPriceKRW: dailyOpenPriceKRW,
          dailyEndPriceUSD: dailyEndPriceUSD,
          dailyEndPriceKRW: dailyEndPriceKRW,
          lastUppdateDate: today,
        },
      });

      if (!created) {
        tokenValue.dailyOpenPriceUSD = dailyOpenPriceUSD;
        tokenValue.dailyOpenPriceKRW = dailyOpenPriceKRW;
        tokenValue.dailyEndPriceUSD = dailyEndPriceUSD;
        tokenValue.dailyEndPriceKRW = dailyEndPriceKRW;
        await tokenValue.save();
      }
    } catch (e) {
      console.error(`Failed to update ASD token price: ${e}`);
    }
  });
};
