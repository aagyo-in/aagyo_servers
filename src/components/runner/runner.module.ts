import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Runner, RunnerSchema } from "src/Schema/runner";
import { RunnerService } from "./runner.service";
import { RunnerController } from "./runner.controller";
import { S3Service } from "../s3/s3.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Runner.name, schema: RunnerSchema }]),
  ],
  providers: [RunnerService, S3Service],
  controllers: [RunnerController],
  exports: [RunnerService],
})
export class RunnerModule {}
