import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  NotEquals,
  ValidateIf,
} from "class-validator";

enum ADDRESSOWNER {
  SELF = "SELF",
  ANOTHER = "ANOTHER",
}

class AddressDTO {
  @ApiProperty()
  @IsString()
  buildingName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  floor: string;

  @ApiProperty()
  @IsString()
  area: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  landmark: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  longitude: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lattitude: string;
}

export class CreateAddressDTO {
  @ApiProperty({
    enum: ADDRESSOWNER,
    enumName: "Address Owner",
    example: ADDRESSOWNER.SELF,
    required: true,
  })
  @IsString()
  @IsEnum(ADDRESSOWNER)
  @IsNotEmpty()
  addressOwner: ADDRESSOWNER;

  @ApiProperty()
  @IsString()
  addressType?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  alternatePhone: string;

  @ApiProperty({ type: AddressDTO })
  @IsObject()
  address: AddressDTO;
}
