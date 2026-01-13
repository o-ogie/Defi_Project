import express from 'express';
import {
  getCoinPriceController,
  getCoinCurrencyController,
} from './coinMarket.controller';

export const router = express.Router();

router.get('/coinPrice', getCoinPriceController);
router.get('/currency', getCoinCurrencyController);
