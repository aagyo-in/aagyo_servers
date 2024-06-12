import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export enum ORDERFACILITY {
  BOTH = "BOTH",
  PICKUP = "PICKUP",
  DELIVERY = "DELIVERY",
}
export enum PAYMENTMETHOD {
  BOTH = "BOTH",
  COD = "COD",
  ONLINEPAYMENT = "ONLINEPAYMENT",
}

export class CreateDiscountDTO {
  @IsArray()
  @IsNotEmpty()
  merchant: [string];

  @IsNotEmpty()
  @IsString()
  couponType: string;

  @IsNotEmpty()
  @IsString()
  couponSponsored: string;

  @IsNotEmpty()
  @IsString()
  offerName: string;

  @IsNotEmpty()
  @IsString()
  couponCode: string;

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsNumber()
  discountedAmountUpto: number;

  @IsNotEmpty()
  @IsNumber()
  minimumOrderAmount: number;

  @IsNotEmpty()
  @IsNumber()
  usagePerCustomer: number;

  @IsNotEmpty()
  @IsString()
  dateFrom: string;

  @IsNotEmpty()
  @IsString()
  dateTo: string;

  @IsEnum(ORDERFACILITY)
  orderFacility: string = ORDERFACILITY.BOTH;

  @IsEnum(PAYMENTMETHOD)
  paymentMethod: string = PAYMENTMETHOD.BOTH;

  @IsString()
  @IsOptional()
  termAndCond: string;

  @IsString()
  @IsOptional()
  offerDesc: string;

  @IsOptional()
  banner: object;
}
