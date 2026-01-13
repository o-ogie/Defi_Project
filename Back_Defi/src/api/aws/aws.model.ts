import { S3, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { config } from '../../../config';
import { AwsConfig, S3Params } from './interface.aws';

const env: 'development' | 'production' = (process.env.NODE_ENV ||
  'development') as 'development' | 'production';
const AWSConfig = config[env].awss3;

const awsConfig: AwsConfig = {
  credentials: {
    accessKeyId: AWSConfig.AccessKeyID,
    secretAccessKey: AWSConfig.SecretAccessKey,
  },
  region: AWSConfig.Region,
};

const defaultParams: S3Params = {
  Bucket: AWSConfig.BucketName,
  ACL: AWSConfig.ACL,
};

const AWSs3 = new S3(awsConfig);

export const createSignedURL = async (filename: string) => {
  const params = {
    ...defaultParams,
    Key: `images/${filename}`,
    Expires: 60 * 5,
  };

  try {
    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(AWSs3, command, { expiresIn: 60 * 5 });
    return signedUrl;
  } catch (e) {
    console.log(
      `This error occured createSignedURL from aws.model.ts. The Error message is ${e}`,
    );
    throw e;
  }
};
