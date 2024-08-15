import {
  IsEmail,
  IsString,
  IsObject,
  IsBoolean,
  IsArray,
  IsNumber,
  IsOptional,
} from "class-validator";
import { Type as ValidationTypes } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class OWNERDETAIL {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  gender: string;
}

class STOREDETAILS {
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

class OPENDAYSANDTIME {
  @ApiProperty()
  @IsString()
  day: string;
  @ApiProperty()
  @IsString()
  openTime: string;
  @ApiProperty()
  @IsString()
  closeTime: string;
}
class STORETIME {
  @ApiProperty()
  @IsBoolean()
  isFullTimeOpen: boolean;

  @ApiProperty({ type: OPENDAYSANDTIME })
  openDaysAndTime: [OPENDAYSANDTIME];

  @ApiProperty()
  aditionalClosing: [];

  @ApiProperty()
  @IsString()
  storeOffMessage: string;
}

class BANKDETAIL {
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
class DOCUMENTDETAIL {
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

export class CreateMerchantDTO {
  @ApiProperty({ type: OWNERDETAIL })
  @IsObject()
  ownerDetails: OWNERDETAIL;

  @ApiProperty({ type: STOREDETAILS })
  @IsObject()
  storeDetails: STOREDETAILS;

  @ApiProperty({ type: STORETIME })
  @IsObject()
  storeTime: STORETIME;

  @ApiProperty({ type: BANKDETAIL })
  @IsObject()
  bankDetails: BANKDETAIL;

  @ApiProperty({ type: DOCUMENTDETAIL })
  @IsObject()
  documentDetail: DOCUMENTDETAIL;
}
