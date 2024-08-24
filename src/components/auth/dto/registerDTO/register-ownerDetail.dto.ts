import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail, 
  IsNotEmpty, 
  IsString,
  IsStrongPassword,
} from "class-validator";

export class RegisterOwnerDetailDTO {
  @ApiProperty() 
  @IsString()
  @IsNotEmpty()
  merchant_id: string;
  
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  gender: string;
}
