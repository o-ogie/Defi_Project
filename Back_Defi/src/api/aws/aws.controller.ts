import { Request, Response, NextFunction } from 'express';
import { createSignedURL } from './aws.model';

export const getSignedURL = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const objectKey = req.params.objectKey;
    const signedURL = await createSignedURL(objectKey);
    res.json({ signedURL });
  } catch (e) {
    console.log(
      `This error occurred getSignedURL from aws.controller.ts. The Error message is ${e}`,
    );
    res.status(500).json({ ErrorEvent: `${e}.message` });
  }
};
