import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export enum Status {
  ON = "ON",
  INACTIVE = "INACTIVE",
  OFF = "OFF",
}

export class CreateShippingChargeDTO {
  @IsString()
  @IsNotEmpty()
  zone: string;
  @IsString()
  @IsNotEmpty()
  operatingZone: string;
  @IsNumber()
  @IsNotEmpty()
  radius: number;
  @IsString()
  @IsNotEmpty()
  option: string;
  @IsNumber()
  @IsNotEmpty()
  minimumAmount: number;
  @IsNumber()
  @IsNotEmpty()
  shippingFee: number;
  @IsBoolean()
  @IsNotEmpty()
  minOrderNA: boolean;
  @IsBoolean()
  @IsNotEmpty()
  adddShippingFeeGTMO: boolean;
  @IsString()
  @IsNotEmpty()
  note: string;
}
