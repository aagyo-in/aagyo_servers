import { Injectable, Logger } from "@nestjs/common";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  DeleteObjectRequest,
  DeleteObjectsRequest,
  DeleteObjectsCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class S3Service {
  private logger = new Logger(S3Service.name);
  private region: string;
  private bucket: string;
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.region = this.configService.get<string>("S3_REGION") || "ap-south-1";
    this.bucket = this.configService.get<string>("S3_BUCKET");
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        secretAccessKey: this.configService.get<string>("SECRET_KEY"),
        accessKeyId: this.configService.get<string>("ACCESS_KEY"),
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const key = `${file?.fieldname}${Date.now()}`;
    const input: PutObjectCommandInput = {
      Body: file?.buffer,
      Bucket: this?.bucket,
      Key: key,
      ContentType: file?.mimetype,
      ACL: "public-read",
    };
    try {
      const response: PutObjectCommandOutput = await this.s3.send(
        new PutObjectCommand(input)
      );
      if (response.$metadata.httpStatusCode === 200) {
        return {
          file: file?.originalname,
          url: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`,
        };
      }
      throw new Error("Image not saved in S3!");
    } catch (err) {
      this.logger.error(`Cannot save file inside s3`, err);
      throw err;
    }
  }

  async uploadMultipleFile(files: Express.Multer.File[]) {
    const uploadPromises: any = files.map(async (file, index) => {
      const key = `${file.fieldname}${Date.now()}`;
      const input: PutObjectCommandInput = {
        Body: file.buffer,
        Bucket: this.bucket,
        Key: key,
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      try {
        const response: PutObjectCommandOutput = await this.s3.send(
          new PutObjectCommand(input)
        );
        if (response.$metadata.httpStatusCode === 200) {
          return {
            file: file?.originalname,
            url: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`,
          };
        }
        throw new Error("Image not saved in S3!");
      } catch (err) {
        this.logger.error(`Cannot save file inside s3`, err);
        throw err;
      }
    });
    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      return uploadedUrls;
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(key: string) {
    try {
      const input = {
        Bucket: this.bucket,
        Key: key,
      };

      try {
        const command = new DeleteObjectCommand(input);
        const result = await this.s3.send(command);
        console.log(result);
        return `Deleted image ${key} from S3 bucket`;
      } catch (err) {
        this.logger.error(`Cannot delete file inside s3`, err);
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }
  async deletMultipleFile(keys: string[]) {
    try {
      const input = {
        Bucket: this.bucket,
        Delete: {
          Objects: keys.map((key) => ({ Key: key })),
        },
      };

      try {
        const command = new DeleteObjectsCommand(input);
        const result = await this.s3.send(command);
        console.log(result);
        return `Deleteded image from S3 bucket`;
      } catch (err) {
        this.logger.error(`Cannot delete file inside s3`, err);
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }
}
