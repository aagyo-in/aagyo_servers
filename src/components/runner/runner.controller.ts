import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Req,
} from "@nestjs/common";
import { RunnerService } from "./runner.service";
import { CreateRunnerDto, RunnerDetailsDto } from "./dto/runner.dto";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { Request } from "express";

@Controller("/runner")
export class RunnerController {
  constructor(private readonly runnerService: RunnerService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createRunner(
    @Body() createRunnerDto: CreateRunnerDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request
  ) {
    console.log("Request Body: ", req.body);
    console.log("Received DTO:", createRunnerDto);
    console.log("Received Files:", files);

    // Handle files and update DTO
    // if (files && files.length > 0) {
    //   files.forEach((file) => {
    //     switch (file.fieldname) {
    //       case "runnerImage":
    //         createRunnerDto.runnerDetails.runnerImage = file.path; // Save file path
    //         break;
    //       case "aadharFrontImage":
    //         createRunnerDto.documentsDetails.aadharCardDetails.aadharFrontImage =
    //           file.path; // Save file path
    //         break;
    //       case "aadharBackImage":
    //         createRunnerDto.documentsDetails.aadharCardDetails.aadharBackImage =
    //           file.path; // Save file path
    //         break;
    //       case "drivingLicenseImage":
    //         createRunnerDto.documentsDetails.vehicleDetails.drivingLicenseImage =
    //           file.path; // Save file path
    //         break;
    //       case "RcImage":
    //         createRunnerDto.documentsDetails.vehicleDetails.RcImage = file.path; // Save file path
    //         break;
    //     }
    //   });
    // }

    console.log("Mapped DTO:", createRunnerDto);
    return this.runnerService.createRunner(createRunnerDto, files);
  }
}
