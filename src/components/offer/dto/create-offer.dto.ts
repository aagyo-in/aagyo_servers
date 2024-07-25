import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

class File {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  filePath: string;
}
export class CreateOfferDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly couponType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly couponName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly couponCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly discountType: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly discount: number;

  @ApiProperty()
  @IsNumber()
  readonly amountUpto: number;

  @ApiProperty()
  @IsNumber()
  readonly minimumAmount: number;

  @ApiProperty()
  @IsNumber()
  readonly usagePerCustomer: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly dateFrom: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly dateTo: Date;

  @ApiProperty()
  @IsString()
  readonly paymentMethod: string;

  @ApiProperty()
  @IsString()
  readonly termsCondition: string;

  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiProperty({ type: [File] })
  @IsArray()
  readonly files: File[];
}
