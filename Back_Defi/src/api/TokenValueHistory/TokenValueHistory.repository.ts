import { TokenValue } from '../../models/tokenValue.model';
import { Op } from 'sequelize';
const timeZone = 'Asia/Seoul';
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};
const formatter = new Intl.DateTimeFormat('en-US', { ...options, timeZone });

// Today
const partsToday = formatter.formatToParts(new Date());
const yearToday = partsToday.find((part) => part.type === 'year')?.value;
const monthToday = partsToday.find((part) => part.type === 'month')?.value;
const dayToday = partsToday.find((part) => part.type === 'day')?.value;
const today = `${yearToday}-${monthToday}-${dayToday}`;

// Yesterday
const yesterdayDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() - 1);
const partsYesterday = formatter.formatToParts(yesterdayDate);
const yearYesterday = partsYesterday.find(
  (part) => part.type === 'year',
)?.value;
const monthYesterday = partsYesterday.find(
  (part) => part.type === 'month',
)?.value;
const dayYesterday = partsYesterday.find((part) => part.type === 'day')?.value;
const yesterday = `${yearYesterday}-${monthYesterday}-${dayYesterday}`;

export class TokenValueRepository {
  async findAllTokenValue(name: string): Promise<TokenValue[] | null> {
    try {
      return await TokenValue.findAll({ where: { name: name } });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findTokenValueByDate(
    name: string,
    date: string,
  ): Promise<TokenValue | null> {
    try {
      return await TokenValue.findOne({ where: { name: name, date: date } });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findYesterdayTokenValue(name: string): Promise<TokenValue | null> {
    try {
      const timeZone = 'Asia/Seoul';
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      const formatter = new Intl.DateTimeFormat('en-US', {
        ...options,
        timeZone,
      });

      // Yesterday
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const partsYesterday = formatter.formatToParts(yesterdayDate);
      const yearYesterday = partsYesterday.find(
        (part) => part.type === 'year',
      )?.value;
      const monthYesterday = partsYesterday.find(
        (part) => part.type === 'month',
      )?.value;
      const dayYesterday = partsYesterday.find(
        (part) => part.type === 'day',
      )?.value;
      const yesterday = `${yearYesterday}-${monthYesterday}-${dayYesterday}`;
      console.log(
        `[findYesterdayTokenValue] Querying for token: ${name}, date: ${yesterday}`,
      );
      return await TokenValue.findOne({
        where: { name: name, date: { [Op.like]: yesterday } },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findTodayTokenValue(name: string): Promise<TokenValue | null> {
    try {
      const timeZone = 'Asia/Seoul';
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      const formatter = new Intl.DateTimeFormat('en-US', {
        ...options,
        timeZone,
      });

      // Today
      const partsToday = formatter.formatToParts(new Date());
      const yearToday = partsToday.find((part) => part.type === 'year')?.value;
      const monthToday = partsToday.find(
        (part) => part.type === 'month',
      )?.value;
      const dayToday = partsToday.find((part) => part.type === 'day')?.value;
      const today = `${yearToday}-${monthToday}-${dayToday}`;
      console.log(
        `[findTodayTokenValue] Querying for token: ${name}, date: ${today}`,
      );

      return await TokenValue.findOne({
        where: { name: name, date: { [Op.like]: today } },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async calculatePriceChangePercentage(name: string): Promise<number | null> {
    try {
      const todayTokenValue = await this.findTodayTokenValue(name);
      const yesterdayTokenValue = await this.findYesterdayTokenValue(name);

      if (!todayTokenValue || !yesterdayTokenValue) {
        console.error(`Unable to find token values for: ${name}`);
        return null;
      }

      const yesterdayPrice = yesterdayTokenValue.dailyEndPriceUSD;
      const todayPrice = todayTokenValue.dailyEndPriceUSD;

      if (!yesterdayPrice || !todayPrice) {
        console.error(`Unable to find dailyEndPriceUSD for: ${name}`);
        return null;
      }

      const priceChangePercentage =
        ((todayPrice - yesterdayPrice) / yesterdayPrice) * 100;
      return priceChangePercentage;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
