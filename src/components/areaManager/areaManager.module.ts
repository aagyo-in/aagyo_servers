import { Module } from "@nestjs/common";
import { AreaManagerController } from "./areaManager.controller";
import { AreaManagerService } from "./areaManager.service";

@Module({
  imports: [],
  controllers: [AreaManagerController],
  providers: [AreaManagerService],
})
export class areaManager {}
