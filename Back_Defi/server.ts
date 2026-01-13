import http from 'http';
import https from 'https';
import { config } from './config';
import fs from 'fs';
import app from './app';
import router from './src/routes/index';
import { sequelize } from './src/models';
import { ETHtokenData, ARBtokenData, USDTtokenData } from './src/bulkdata';
import { ITokenData } from './src/bulkdata/tokens/interface.tokendata';
import { PriceUpdate } from './src/api/coinMarket/coinMarket.schedule';
import { ASDtokenData } from './src/bulkdata/tokens/ASD.tokendata';
import { Model, ModelCtor } from 'sequelize';
import express from 'express';
import path from 'path';

app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

const env: 'development' | 'production' = (process.env.NODE_ENV || 
  'development') as 'development' | 'production';
const setting = config[env];

const httpport = setting.server.httpport || 'error';
const httpsport = setting.server.httpsport || 'error';
const useHttps = process.env.USE_HTTPS === 'true';

const isITokenData = (object: any): object is ITokenData => {
  return (
    'name' in object &&
    'date' in object &&
    'dailyOpenPriceUSD' in object &&
    'dailyEndPriceUSD' in object &&
    'dailyOpenPriceKRW' in object &&
    'dailyEndPriceKRW' in object &&
    'lastUppdateDate' in object
  );
};

const initialSyncDB = async () => {
  await sequelize.sync({ force: false });
  const TokenValue = sequelize.models.TokenValue as ModelCtor<Model<any, any>>;
  const bulkdata: readonly ITokenData[] = [
    ...ARBtokenData,
    ...ETHtokenData,
    ...USDTtokenData,
    ...ASDtokenData,
  ].filter(isITokenData);
  await TokenValue.bulkCreate(bulkdata as any[], {
    updateOnDuplicate: [
      'dailyOpenPriceUSD',
      'dailyEndPriceUSD',
      'dailyOpenPriceKRW',
      'dailyEndPriceKRW',
      'lastUppdateDate',
    ],
  });
};

if (useHttps) {
  const privateKey = fs.readFileSync('localhost-key.pem', 'utf8');
  const certificate = fs.readFileSync('localhost.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };
  const httpsServer = https.createServer(credentials, app);
  initialSyncDB();
  PriceUpdate();
  httpsServer.listen(httpsport, () => {
    console.log(`HTTPS Server running on port ${httpsport}`);
  });
} else {
  const httpServer = http.createServer(app);
  initialSyncDB();
  PriceUpdate();
  httpServer.listen(httpport, () => {
    console.log(`HTTP Server running on port ${httpport}`);
  });
}
