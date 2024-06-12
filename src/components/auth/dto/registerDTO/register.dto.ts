import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from "class-validator";

class OwnerDetail {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  contact: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  storeContact: string;
}
class StoreDetail {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  storeName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  banner?: any;
}
class BankDetail {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountHolderName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  mobile: string;
}
class DocumentDetail {
  @ApiProperty()
  @IsNotEmpty()
  accountNumber: [];
}
class TimeDetail {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isFullTimeOpen: boolean;

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
  @IsString()
  openDays: [any];
}

export class RegisterMerchantDTO {
  @ApiProperty()
  @ValidateNested()
  @IsDefined()
  @IsNotEmpty()
  OwnerDetails?: OwnerDetail;

  @ApiProperty()
  @ValidateNested()
  @IsDefined()
  @IsNotEmpty()
  StoreDetail?: StoreDetail;

  @ApiProperty()
  @ValidateNested()
  @IsDefined()
  @IsNotEmpty()
  BankDetail?: BankDetail;

  @ApiProperty()
  @ValidateNested()
  @IsDefined()
  @IsNotEmpty()
  DocumentDetail?: DocumentDetail;

  @ApiProperty()
  @ValidateNested()
  @IsDefined()
  @IsNotEmpty()
  TimeDetail?: TimeDetail;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  id?: string;
}
