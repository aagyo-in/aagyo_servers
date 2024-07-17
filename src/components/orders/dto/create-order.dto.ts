import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

class PRODUCT {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  varientId?: string;

  @ApiProperty()
  @IsNumber()
  productQuantity?: number;
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
  addressId?: string;

  @ApiProperty()
  @IsString()
  instructions?: string;

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
  @IsOptional()
  couponId?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  partnerTip?: number;

  @ApiProperty()
  @IsArray()
  deliveryInstruction?: [string];

  @ApiProperty({ enum: PAYMENTMODE, enumName: "Payment Type" })
  @IsString()
  @IsEnum(PAYMENTMODE)
  paymentMode?: PAYMENTMODE = PAYMENTMODE?.COD;
}
