import { Dashboard } from '../../models/dashboard.model';
import { DashboardRepository } from './dashboard.repository';

export class DashboardService {
  private dashboardRepository: DashboardRepository;

  constructor() {
    this.dashboardRepository = new DashboardRepository();
  }

  async findYesterday(token: string): Promise<Dashboard | null> {
    try {
      return await this.dashboardRepository.findYesterday(token);
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
      return await this.dashboardRepository.regeditDate(
        token,
        TotalDeposit,
        TotalSupply,
        TotalRewardLp,
      );
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
