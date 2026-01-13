import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import cors, { CorsOptions } from 'cors';
import path from 'path';
const cookieParser = require('cookie-parser');

const app: Express = express();

const allowOrigins: { [index: string]: boolean } = {
  'https://localhost:3000': true,
  'http://localhost:3000': true,
  'https://localhost:4000': true,
  'http://localhost:4000': true,
  'https://localhost:4005': true,
  'http://localhost:4005': true,
  'https://www.hynn.kr': true,
  'http://www.hynn.kr': true,
  'https://hynn.kr': true,
  'http://hynn.kr': true,
  'https://www.hynnchain.com': true,
  'http://www.hynnchain.com': true,
  'https://hynnchain.com': true,
  'http://hynnchain.com': true,
  'https://127.0.0.1:3000': true,
  'http://127.0.0.1:3000': true,
};

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    if (!origin || allowOrigins[origin]) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS, origin: ${origin}`));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

const MiddleError: ErrorRequestHandler = (
  e,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode: number = e.statusCode || 500;
  console.log(e.message, 'This error occured MiddleError from app.ts');
  res.status(statusCode).send({ message: e.message });
};
app.use(MiddleError);

export default app;
