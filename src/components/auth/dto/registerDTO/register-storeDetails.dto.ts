import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
import { ObjectId } from "mongodb";

export class RegisterStoreDetailDTO {
  @ApiProperty() 
  @IsString()
  @IsNotEmpty()
  merchant_id: string;

  @ApiProperty()
  @IsString()
  storeName: string;

  @ApiProperty()
  @IsString()
  contactNumber: string;

  @ApiProperty()
  @IsArray()
  category: [string];

  @ApiProperty()
  @IsObject()
  storeImage: {};

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  latitude: string;

  @ApiProperty()
  @IsString()
  longitude: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  zipCode: string;

  @ApiProperty()
  @IsString()
  operatingZone: string;

  @ApiProperty()
  @IsNumber()
  prepareTime: 30;
}
