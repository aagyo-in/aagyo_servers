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

enum ADDRESSTYPE {
  HOME = "HOME",
  WORK = "WORK",
  HOTEL = "HOTEL",
  OTHER = "OTHER",
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

  @ApiProperty({
    enum: ADDRESSTYPE,
    enumName: "Address Type",
    example: ADDRESSTYPE.HOME,
  })
  @IsString()
  @ValidateIf((o) => o.addressOwner === ADDRESSOWNER.SELF)
  @IsEnum(ADDRESSTYPE)
  addressType?: ADDRESSTYPE;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty({ type: AddressDTO })
  @IsObject()
  address: AddressDTO;
}
