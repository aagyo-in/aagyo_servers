import { Module } from "@nestjs/common";
import { ReferAndEarnController } from "./referAndEarn.controller";
import { ReferAndEarnService } from "./referAndEarn.service";

@Module({
  imports: [],
  controllers: [ReferAndEarnController],
  providers: [ReferAndEarnService],
})
export class ReferAndEarnModule {}
