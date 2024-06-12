import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
  IsObject,
  IsStrongPassword,
  ValidateNested,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
  IsDefined,
  ArrayMinSize,
} from "class-validator";
import { Type as ValidationTypes } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class storeDetails {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "Name could not be empty" })
  readonly fullName: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber()
  readonly phoneNumber: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsStrongPassword()
  @Min(8)
  @Max(16)
  readonly password: string;

  @ApiProperty()
  @IsString()
  readonly storeName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly contactEmail: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber()
  readonly contactNumber: string;

  @ApiProperty()
  @IsString()
  readonly contactPerson: string;

  @ApiProperty()
  @IsString()
  readonly address: string;

  @ApiProperty()
  @IsString()
  readonly loyality: string;

  @ApiProperty()
  @IsString()
  readonly country: string;

  @ApiProperty()
  @IsString()
  readonly state: string;

  @ApiProperty()
  @IsString()
  readonly city: string;

  @ApiProperty()
  @IsString()
  readonly timeZone: string;

  @ApiProperty()
  @IsString()
  readonly zipCode: string;

  @ApiProperty()
  @IsString()
  readonly operatingZone: string;

  @ApiProperty()
  @IsNumber()
  readonly prepareTime: number;

  @ApiProperty()
  @IsString()
  readonly operationType: string;

  @ApiProperty()
  @IsString()
  readonly aboutUs: string;

  @ApiProperty()
  @IsObject()
  readonly banner: Object;
}

class storeTime {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly isFullTimeOpen: boolean;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  readonly time: Object;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly openDays: [];

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly storeOffMessage: string;
}

class commission {
  @ApiProperty()
  @IsString()
  readonly payoutType: string;

  @ApiProperty()
  @IsNumber()
  readonly value: 0;
}

class storeTags {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1, { message: "Array must have at least one element" })
  readonly tags: [];
}

export class storeCategory {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1, { message: "Array must have at least one element" })
  readonly category: [];
}

export class CreateMerchantDTO {
  // @ApiProperty()
  // @ValidateNested()
  // @IsDefined()
  // // @ValidationTypes(() => storeDetails)
  // storeDetails?: storeDetails;

  // @ApiProperty()
  // @IsObject()
  // @IsDefined()
  // @ValidateNested()
  // @ValidationTypes(() => storeTime)
  // storeTime?: storeTime;

  // @ApiProperty()
  // @IsObject()
  // @IsDefined()
  // @ValidateNested()
  // @ValidationTypes(() => commission)
  // commission: commission;

  // @ApiProperty()
  // @IsObject()
  // @ValidateNested()
  // @ValidationTypes(() => storeTags)
  // storeTags: storeTags;

  // @ApiProperty()
  // @IsObject()
  // @ValidateNested()
  // @ValidationTypes(() => storeCategory)
  // storeCategory: storeCategory;
}
