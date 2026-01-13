import { Dashboard } from '../../models/dashboard.model';
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

export class DashboardRepository {
  async findYesterday(token: string): Promise<Dashboard | null> {
    try {
      return await Dashboard.findOne({
        where: { Token: token, Date: yesterday },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  async regeditDate(
    token: string,
    TotalDeposit: number,
    TotalSupply: number,
    TotalRewardLp: number,
  ): Promise<Dashboard | null> {
    try {
      return await Dashboard.create({
        Token: token,
        Date: today,
        TotalDeposit: TotalDeposit,
        TotalSupply: TotalSupply,
        TotalRewardLp: TotalRewardLp,
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
