// src/services/verify-runner.service.ts

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  VerifyRunner,
  VerifyRunnerDocument,
} from "src/Schema/verifyrunner/verifyrunner.schema";
import { CreateVerifyRunnerDto } from "./dto/verifyrunner.dto";

@Injectable()
export class VerifyRunnerService {
  constructor(
    @InjectModel(VerifyRunner.name)
    private verifyRunnerModel: Model<VerifyRunnerDocument>
  ) {}

  async create(
    createVerifyRunnerDto: CreateVerifyRunnerDto
  ): Promise<VerifyRunner> {
    const createdVerifyRunner = new this.verifyRunnerModel(
      createVerifyRunnerDto
    );
    return createdVerifyRunner.save();
  }

  async update(
    runnerId: string,
    updateVerifyRunnerDto: Partial<CreateVerifyRunnerDto>
  ): Promise<VerifyRunner> {
    return this.verifyRunnerModel.findOneAndUpdate(
      { runnerId },
      updateVerifyRunnerDto,
      { new: true }
    );
  }

  async findOne(runnerId: string): Promise<VerifyRunner> {
    return this.verifyRunnerModel.findOne({ runnerId }).exec();
  }
}
