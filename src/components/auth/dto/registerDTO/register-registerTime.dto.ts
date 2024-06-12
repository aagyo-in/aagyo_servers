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

class Slot {
  @ApiProperty()
  @IsOptional()
  @IsString()
  openTime: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  closeTime: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  openDays: any[];
}

export class RegisterTime {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isFullTimeOpen: boolean = false;

  @ApiProperty({ type: [Slot] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  slots: Slot[];
}
