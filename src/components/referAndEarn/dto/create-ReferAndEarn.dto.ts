import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateReferAndEarnDTO {
  @IsNotEmpty()
  zone: string;

  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  couponType: string;
  @IsNotEmpty()
  merchant: string;
  @IsNotEmpty()
  discountOffer: string;
  @IsNotEmpty()
  daysValidity: number;
  @IsNotEmpty()
  discount: number;
  @IsNotEmpty()
  discountUpto: number;
  @IsNotEmpty()
  minOrderAmount: number;
  @IsNotEmpty()
  notificationText: string;
  @IsNotEmpty()
  status: boolean;
}
