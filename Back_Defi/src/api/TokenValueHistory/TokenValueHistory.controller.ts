import { Request, Response, NextFunction } from 'express';
import { TokenValueService } from './TokenValueHistory.service';

export class TokenValueController {
  constructor(private tokenValueService: TokenValueService) {}

  async findByTokenName(req: Request, res: Response, next: NextFunction) {
    const { name } = req.params;
    try {
      const tokenValue = await this.tokenValueService.findByTokenName(name);
      res.status(200).json(tokenValue);
    } catch (e) {
      next(e);
    }
  }

  async findByTokenNameAndDate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { name, date } = req.params;
    try {
      const tokenValue = await this.tokenValueService.findByTokenNameAndDate(
        name,
        date,
      );
      res.status(200).json(tokenValue);
    } catch (e) {
      next(e);
    }
  }

  async findYesterdayTokenValue(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { name } = req.params;
      const tokenValue = await this.tokenValueService.findYesterdayTokenValue(
        name,
      );
      res.status(200).json(tokenValue);
    } catch (e) {
      next(e);
    }
  }

  async findTodayTokenValue(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.params;
      const tokenValue = await this.tokenValueService.findTodayTokenValue(name);
      res.status(200).json(tokenValue);
    } catch (e) {
      next(e);
    }
  }
  async calculatePriceChangePercentage(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { name } = req.params;
    try {
      const priceChangePercentage =
        await this.tokenValueService.calculatePriceChangePercentage(name);
      res.status(200).json({ priceChangePercentage });
    } catch (e) {
      next(e);
    }
  }
}
