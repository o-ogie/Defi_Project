import express from 'express';
import { getSignedURL } from './aws.controller';

export const router = express.Router();

router.get('/signedurl/:objectKey', getSignedURL);
