import { Module } from "@nestjs/common";
import { OperatingZoneController } from "./operatingZone.controller";
import { OperatingZoneService } from "./operatingZone.service";

@Module({
  imports: [],
  controllers: [OperatingZoneController],
  providers: [OperatingZoneService],
})
export class OperatingZoneModule {}
