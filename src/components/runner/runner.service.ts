import { Injectable } from "@nestjs/common";
import { CreateRunnerDto } from "./dto/runner.dto";
import { CrudService } from "src/base/crud.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Runner, RunnerDocument } from "src/Schema/runner";
import { S3Service } from "../s3/s3.service";

@Injectable()
export class RunnerService extends CrudService {
  constructor(
    @InjectModel(Runner.name)
    private readonly runnerModel: Model<RunnerDocument>,
    private readonly s3Service: S3Service
  ) {
    super(runnerModel);
  }

  async createRunner(
    createRunnerDto: CreateRunnerDto,
    files: Array<Express.Multer.File>
  ): Promise<{ message: string; status: string }> {
    try {
      if (files && files.length > 0) {
        for (const file of files) {
          console.log("fffffffff", file.fieldname);
          let s3Url = await this.s3Service.uploadFile(file);
          console.log("s3uuuuurrrrrll", s3Url);
          switch (file.fieldname) {
            case "runnerImage":
              console.log(1);
              createRunnerDto.runnerDetails.runnerImage = s3Url;
              break;
            case "aadharFrontImage":
              console.log(2);
              createRunnerDto.documentsDetails.aadharCardDetails.aadharFrontImage =
                s3Url;
              break;
            case "aadharBackImage":
              console.log(3);
              createRunnerDto.documentsDetails.aadharCardDetails.aadharBackImage =
                s3Url;
              break;
            case "drivingLicenseImage":
              console.log(4);
              createRunnerDto.documentsDetails.vehicleDetails.drivingLicenseImage =
                s3Url;
              break;
            case "RcImage":
              console.log(5);
              createRunnerDto.documentsDetails.vehicleDetails.RcImage = s3Url;
              break;
          }
        }
      }
      // Flatten the DTO before saving to the database
      const runnerData = {
        ...createRunnerDto.runnerDetails,
        bankDetails: createRunnerDto.bankDetails,
        documentsDetails: createRunnerDto.documentsDetails,
      };
      console.log("rrrrrruuuuunnnner detaiiiillllllss", runnerData);
      const result = await this.runnerModel.create(runnerData);
      console.log("rrrrrresult= ", result);
      return {
        message: "Runner created successfully!",
        status: "SUCCESS",
      };
    } catch (err) {
      console.log(err);
      throw new Error("Error creating runner");
    }
  }
}
