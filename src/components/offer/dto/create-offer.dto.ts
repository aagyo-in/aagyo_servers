import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

enum DISCOUNTAPPLICABLEFOR {
  ALL_USER = "ALL_USER",
  NEW_USER = "NEW_USER",
}

enum SELECTMEALTIME {
  ALL = "ALL",
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
}

enum PAYMENTMETHOD {
  BOTH = "BOTH",
  ONLINE = "ONLINE",
  METHOD = "METHOD",
}

export class CreateOfferDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly discount: number;

  @ApiProperty()
  @IsNumber()
  readonly amountUpto: number;

  @ApiProperty()
  @IsNumber()
  readonly minimumAmount: number;

  @ApiProperty()
  @IsNumber()
  readonly usagePerCustomer: number;

  @ApiProperty({ type: DISCOUNTAPPLICABLEFOR, enum: DISCOUNTAPPLICABLEFOR })
  @IsString()
  @IsEnum({ type: DISCOUNTAPPLICABLEFOR })
  readonly discountApplicablreFor: DISCOUNTAPPLICABLEFOR =
    DISCOUNTAPPLICABLEFOR.ALL_USER;

  @ApiProperty({ type: SELECTMEALTIME, enum: SELECTMEALTIME })
  @IsString()
  @IsEnum({ type: SELECTMEALTIME })
  readonly selectMealTime: SELECTMEALTIME = SELECTMEALTIME.ALL;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly dateFrom: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly dateTo: Date;

  @ApiProperty({ type: PAYMENTMETHOD, enum: PAYMENTMETHOD })
  @IsString()
  @IsEnum({ type: PAYMENTMETHOD })
  readonly paymentMethod: PAYMENTMETHOD = PAYMENTMETHOD.BOTH;
}
