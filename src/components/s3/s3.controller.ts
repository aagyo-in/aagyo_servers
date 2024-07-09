import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guards";
import { FileSizeValidationPipe } from "src/pipes/UploadedFile.pipe";
import { S3Service } from "./s3.service";
import { CustomHttpException } from "src/exception/custom-http.exception";

@ApiTags("Upload Files")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("file")
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}
  @ApiOperation({ summary: "Upload  Single File" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "file",
          format: "binary",
        },
      },
    },
  })
  @Post("uploadSignle")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("file"))
  async uploadSingleFile(
    @UploadedFile(new FileSizeValidationPipe(20))
    file: Express.Multer.File
  ) {
    try {
      if (!file) {
        throw new HttpException(
          "Product image is required",
          HttpStatus.BAD_REQUEST
        );
      }
      const response = await this.s3Service.uploadFile(file);

      return {
        message: "File Upload Successfully!",
        data: response,
        status: true,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  @ApiOperation({ summary: "Upload Multiple File" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        files: {
          type: "array",
          items: {
            type: "file",
            format: "binary",
          },
        },
      },
    },
  })
  @Post("uploadMultiple")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor("files"))
  async uploadMultipleFiles(
    @UploadedFiles()
    files: Array<Express.Multer.File>
  ) {
    try {
      if (!files) {
        throw new HttpException(
          "Product images is required",
          HttpStatus.BAD_REQUEST
        );
      }
      const response = await this.s3Service.uploadMultipleFile(files);

      return {
        message: "File Upload Successfully!",
        data: response,
        status: true,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  @ApiOperation({ summary: "Delete Single File" })
  @ApiQuery({ name: "filepath", description: "Path to the file" })
  @Post("delete")
  @HttpCode(HttpStatus.OK)
  async deleteFile(@Query("filepath") filepath: string) {
    try {
      if (!filepath) {
        throw new HttpException(
          "FIle path is required",
          HttpStatus.BAD_REQUEST
        );
      }
      const response = await this.s3Service.deleteFile(filepath);
      console.log(response);
      return {
        message: "File Deleted Successfully!",
        // data: response,
        status: true,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
}
