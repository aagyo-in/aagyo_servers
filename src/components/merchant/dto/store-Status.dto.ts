import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
} from "class-validator";

enum StoreTime {
  TWOHOUR = "TWOHOUR",
  FOURHOUR = "FOURHOUR",
  TOMMAROW = "TOMMAROW",
  CUSTOM = "CUSTOM",
  NULL = "NULL",
}

export class StoreStatus {
  @ApiProperty()
  @IsBoolean()
  isOpen: boolean = true;

  @ApiProperty({ enum: StoreTime, enumName: "StoreTime" })
  @IsEnum(StoreTime)
  autoOpenTime: StoreTime = StoreTime.CUSTOM;
}
