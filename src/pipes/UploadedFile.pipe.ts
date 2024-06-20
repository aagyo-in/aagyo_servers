import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  private readonly maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === "body" || !value) {
      return value;
    }

    if (Array.isArray(value)) {
      value.forEach((file) => this.checkFileSize(file));
    } else {
      this.checkFileSize(value);
    }

    return value;
  }

  private checkFileSize(file: Express.Multer.File) {
    if (file.size / 1024 / 1024 > this.maxSize) {
      throw new BadRequestException(
        `File size exceeds the maximum limit of ${this.maxSize} MB.`
      );
    }
  }
}
