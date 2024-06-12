import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { S3Service } from "../s3/s3.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService, S3Service],
})
export class CategoryModule {}
