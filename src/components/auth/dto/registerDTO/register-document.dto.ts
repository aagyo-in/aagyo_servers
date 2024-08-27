import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  isObject,
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
  @IsObject()
  aadharFrontImg?: object;

  @ApiProperty()
  @IsObject()
  aadharBackImg?: object;
}

class PAN {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsObject()
  panImg: object;
}
class GST {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsObject()
  img?: object;
}
class STORE {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsObject()
  img?: object;
}
class OTHER {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsObject()
  img?: object;
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
