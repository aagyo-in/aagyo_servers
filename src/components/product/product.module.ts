import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { S3Service } from "../s3/s3.service";

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, S3Service],
})
export class ProductModule {}
