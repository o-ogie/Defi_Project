import { NextFunction, Request, Response } from 'express';
import { DashboardService } from './dashboard.service';

export class DashboardController {
  private dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardService();
  }

  findYesterday = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.params.token;

    try {
      const dashboard = await this.dashboardService.findYesterday(token);

      if (!dashboard) {
        return res.status(404).json({
          error: `No data found for token ${token} on yesterday's date.`,
        });
      }

      res.json(dashboard);
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  };

  regeditDate = async (req: Request, res: Response, next: NextFunction) => {
    const { token, totalDeposit, totalSupply, totalRewardLp } = req.body;

    try {
      const newRecord = await this.dashboardService.regeditDate(
        token,
        totalDeposit,
        totalSupply,
        totalRewardLp,
      );

      if (!newRecord) {
        return res.status(500).json({
          error: 'Failed to create a new daily record.',
        });
      }

      res.status(201).json(newRecord);
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  };
}
