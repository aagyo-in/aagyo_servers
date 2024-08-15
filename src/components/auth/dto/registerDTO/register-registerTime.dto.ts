import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from "class-validator";
import { ObjectId } from "mongodb";

class OPENDAYSANDTIME {
  @ApiProperty()
  @IsString()
  day: string;
  @ApiProperty()
  @IsString()
  openTime: string;
  @ApiProperty()
  @IsString()
  closeTime: string;
}

class AditionalClosingType {
  @ApiProperty()
  @IsString()
  nth: string;
  @ApiProperty()
  @IsString()
  day: string;
  @ApiProperty()
  @IsString()
  date: string;
}

export class RegisterTime {
  @ApiProperty()
  @IsBoolean()
  isFullTimeOpen: boolean;

  @ApiProperty({ type: [OPENDAYSANDTIME] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OPENDAYSANDTIME)
  openDaysAndTime: OPENDAYSANDTIME[];

  @ApiProperty({ type: [AditionalClosingType] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AditionalClosingType)
  aditionalClosing: AditionalClosingType[];

  @ApiProperty()
  @IsString()
  storeOffMessage: string;
}
