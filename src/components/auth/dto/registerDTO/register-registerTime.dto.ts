import { ApiProperty } from "@nestjs/swagger";
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
export class RegisterTime {
  @ApiProperty()
  @IsBoolean()
  isFullTimeOpen: boolean;

  @ApiProperty({ type: OPENDAYSANDTIME })
  openDaysAndTime: [OPENDAYSANDTIME];

  @ApiProperty()
  aditionalClosing: [];

  @ApiProperty()
  @IsString()
  storeOffMessage: string;
}
