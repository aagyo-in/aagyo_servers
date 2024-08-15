import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from "class-validator";

class AADHAR {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  aadharFrontImg: string;

  @ApiProperty()
  @IsString()
  aadharBackImg: string;
}

class PAN {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  panImg: string;
}
class GST {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  img: string;
}
class STORE {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  img: string;
}
class OTHER {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  img: string;
}
export class RegisterDocumentDTO {
  @ApiProperty({ type: AADHAR })
  @IsObject()
  aadhar: AADHAR;

  @ApiProperty({ type: PAN })
  @IsObject()
  pan: PAN;

  @ApiProperty({ type: GST })
  @IsObject()
  gst: GST;
  @ApiProperty({ type: STORE })
  @IsObject()
  store: STORE;
  @ApiProperty({ type: OTHER })
  @IsObject()
  other: OTHER[];
}
