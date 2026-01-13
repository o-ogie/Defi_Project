import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, './.env'),
});

export const config = {
  development: {
    db: {
      database: process.env.DB_DATABASE_TEST || 'error',
      username: process.env.DB_USER || 'error',
      password: process.env.DB_PASSWORD || 'error',
      host: process.env.DB_HOST || 'error',
      port: process.env.DB_PORT || 3306,
      dialect: process.env.DB_DIALECT || 'error',
      define: {
        frezeTableName: true,
        timestamps: false,
      },
      timezone: '+09:00',
      dialectOptions: {
        charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true,
      },
    },
    awss3: {
      AccessKeyID: process.env.AWS_ACCESS_KEY || 'error',
      SecretAccessKey: process.env.AWS_SECRET_KEY || 'error',
      Region: process.env.AWS_REGION || 'error',
      BucketName: process.env.AWS_BUCKET_NAME || 'error',
      ACL: process.env.AWS_ACL || 'error',
    },
    domain: {
      domain: process.env.DOMAIN || 'error',
    },
    server: {
      httpport: process.env.HTTPPORT || 'error',
      httpsport: process.env.HTTPSPORT || 'error',
    },
    coinMarketCap: {
      apiKey: process.env.COINMARKETCAP_API || 'error',
    },
  },

  production: {
    db: {
      database: process.env.DB_DATABASE || 'error',
      username: process.env.DB_USER || 'error',
      password: process.env.DB_PASSWORD || 'error',
      host: process.env.DB_HOST || 'error',
      port: process.env.DB_PORT || 'error',
      dialect: process.env.DB_DIALECT || 'error',
      define: {
        frezeTableName: true,
        timestamps: false,
      },
      timezone: '+09:00',
      dialectOptions: {
        charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true,
      },
    },
    awss3: {
      AccessKeyID: process.env.AWS_ACCESS_KEY || 'error',
      SecretAccessKey: process.env.AWS_SECRET_KEY || 'error',
      Region: process.env.AWS_REGION || 'error',
      BucketName: process.env.AWS_BUCKET_NAME || 'error',
      ACL: process.env.AWS_ACL || 'error',
    },
    domain: {
      domain: process.env.DOMAIN || 'error',
    },
    server: {
      httpport: process.env.HTTPPORT || 'error',
      httpsport: process.env.HTTPSPORT || 'error',
    },
    coinMarketCap: {
      apiKey: process.env.COINMARKETCAP_API || 'error',
    },
  },
};
