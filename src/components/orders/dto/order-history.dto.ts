import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

enum ORDERSTATUS {
  DELIVERED = "DELIVERED",
  CANCELLED = "INACTIVE",
  REJECTED = "REJECTED",
  TIMEDOUT = "TIMEDOUT",
}

enum ORDERTYPE {
  AAGYODELIVERY = "AAGYODELIVERY",
  SELFDELIVERY = "SELFDELIVERY",
  PICKUP = "PICKUP",
}

enum DAY {
  TODAY = "TODAY",
  YESTERDAY = "YESTERDAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
}
export class OrderHistoryDTO {
  @ApiProperty({ enum: ORDERSTATUS, enumName: " Order Status" })
  @IsString()
  @IsEnum(ORDERSTATUS)
  orderStatus?: ORDERSTATUS = ORDERSTATUS.DELIVERED;

  @ApiProperty({ enum: ORDERTYPE, enumName: " Order Type" })
  @IsString()
  @IsEnum(ORDERTYPE)
  orderType?: ORDERTYPE = ORDERTYPE.AAGYODELIVERY;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ enum: DAY, enumName: "Day" })
  @IsString()
  @IsEnum(DAY)
  day?: DAY = DAY.TODAY;

  @ApiProperty({ default: 1, type: Number, minimum: 1 })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiProperty({ default: 1, type: Number, minimum: 1 })
  @IsString()
  limit?: string;
}
