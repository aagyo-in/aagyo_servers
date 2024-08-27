// src/controllers/verify-runner.controller.ts

import { Controller, Post, Body, Param, Put, Get } from "@nestjs/common";
import { VerifyRunnerService } from "./verifyrunner.service";
import { CreateVerifyRunnerDto } from "./dto/verifyrunner.dto";

@Controller("verifyrunner")
export class VerifyRunnerController {
  constructor(private readonly verifyRunnerService: VerifyRunnerService) {}

  @Post()
  async create(@Body() createVerifyRunnerDto: CreateVerifyRunnerDto) {
    return this.verifyRunnerService.create(createVerifyRunnerDto);
  }

  @Put(":runnerId")
  async update(
    @Param("runnerId") runnerId: string,
    @Body() updateVerifyRunnerDto: Partial<CreateVerifyRunnerDto>
  ) {
    return this.verifyRunnerService.update(runnerId, updateVerifyRunnerDto);
  }

  @Get(":runnerId")
  async findOne(@Param("runnerId") runnerId: string) {
    return this.verifyRunnerService.findOne(runnerId);
  }
}
export class verifyRunnerModule {}
