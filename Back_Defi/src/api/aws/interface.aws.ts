export interface AwsConfig {
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  region: string;
}

export interface S3Params {
  Bucket: string;
  ACL: string;
  Key?: string;
  Body?: Buffer;
  ContentType?: string;
  Expires?: number;
}
