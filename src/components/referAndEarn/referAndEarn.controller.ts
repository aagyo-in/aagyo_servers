import { Body, Controller, Get, Post } from "@nestjs/common";
import { ReferAndEarnService } from "./referAndEarn.service";
import { CreateReferAndEarnDTO } from "./dto/create-ReferAndEarn.dto";

@Controller("referAndEarn")
export class ReferAndEarnController {
  constructor(private readonly referAndEarnService: ReferAndEarnService) {}

  @Post("create")
  createReferAndEarn(
    @Body() createReferAndEarnDTO: CreateReferAndEarnDTO
  ): any {
    return this.referAndEarnService.createReferAndEarn(createReferAndEarnDTO);
  }
}
