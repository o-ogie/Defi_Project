import express, { Request, Response, NextFunction } from 'express';
import { dashboardController } from './dashboard.module';

export const router = express.Router();

router.get(
  '/findDate/:token',
  (req: Request, res: Response, next: NextFunction) =>
    dashboardController.findYesterday(req, res, next),
);

router.post('/regeditDate', (req: Request, res: Response, next: NextFunction) =>
  dashboardController.regeditDate(req, res, next),
);

export default router;
