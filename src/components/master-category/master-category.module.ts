import { Module } from '@nestjs/common';
import { MasterCategoryService } from './master-category.service';
import { MasterCategoryController } from './master-category.controller';
import { S3Service } from '../s3/s3.service';

@Module({
  controllers: [MasterCategoryController],
  providers: [MasterCategoryService, S3Service]
})
export class MasterCategoryModule {}
