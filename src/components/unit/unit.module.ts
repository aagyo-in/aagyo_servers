import { Module } from "@nestjs/common";
import { UnitController } from "./unit.controller";
import { UnitService } from "./unit.services";

@Module({
  controllers: [UnitController],
  providers: [UnitService],
  imports: [],
})
export class UnitModule {}
