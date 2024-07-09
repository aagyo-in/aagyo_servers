import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsString, ValidateNested } from "class-validator";

class PRODUCT {
  @ApiProperty()
  @IsString()
  productName?: string;

  @ApiProperty()
  @IsNumber()
  productQuantity?: number;

  @ApiProperty()
  @IsNumber()
  strikePrice?: number;

  @ApiProperty()
  @IsNumber()
  price?: number;
}

enum PAYMENTMODE {
  ONLINE = "ONLINE",
  COD = "COD",
  WALLET = "WALLET",
}

export class CreateOrderDTO {
  @ApiProperty({ type: [PRODUCT] })
  @ValidateNested({ each: true })
  @Type(() => PRODUCT)
  products?: PRODUCT[];

  @ApiProperty()
  @IsString()
  instructions?: string;

  @ApiProperty()
  @IsNumber()
  subTotal?: number;

  @ApiProperty()
  @IsNumber()
  handlingCharge?: number;

  @ApiProperty()
  @IsNumber()
  deliveryCharge?: number;

  @ApiProperty()
  @IsNumber()
  total?: number;

  @ApiProperty()
  @IsString()
  coupon?: string;

  @ApiProperty()
  @IsString()
  partnerTip?: string;

  @ApiProperty({ enum: PAYMENTMODE, enumName: "Payment Type" })
  @IsString()
  @IsEnum(PAYMENTMODE)
  paymentMode?: PAYMENTMODE = PAYMENTMODE?.COD;
}
