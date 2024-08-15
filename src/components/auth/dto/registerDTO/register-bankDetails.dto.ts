import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { ObjectId } from "mongoose";

export class RegisterBankDetailDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  accountNumber: string;
  @ApiProperty()
  @IsString()
  accountType: string;
  @ApiProperty()
  @IsString()
  accountHolderName: string;
  @ApiProperty()
  @IsString()
  ifsc: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  mobile: string;
}
