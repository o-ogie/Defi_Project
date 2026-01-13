import express from 'express';
import { tokenValueController } from './TokenValueHistory.module';

export const router = express.Router();

router.get('/tokenValue/:name', (req, res, next) =>
  tokenValueController.findByTokenName(req, res, next),
);
router.get('/tokenValue/:name/:date', (req, res, next) =>
  tokenValueController.findByTokenNameAndDate(req, res, next),
);

router.get('/yesterday/:name', (req, res, next) =>
  tokenValueController.findYesterdayTokenValue(req, res, next),
);

router.get('/today/:name', (req, res, next) =>
  tokenValueController.findTodayTokenValue(req, res, next),
);

router.get('/priceChangePercentage/:name', (req, res, next) =>
  tokenValueController.calculatePriceChangePercentage(req, res, next),
);

export default router;
