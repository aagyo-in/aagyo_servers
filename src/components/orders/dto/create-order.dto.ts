import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
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
  @IsNumber()
  productQuantity?: number;
}

enum PAYMENTMODE {
  ONLINE = "ONLINE",
  COD = "COD",
  WALLET = "WALLET",
}

enum DELIVERY_INSTRUCTION {
  AVOID_CALL = "AVOID_CALL",
  DONT_BELL = "DONT_BELL",
  LEAVE_AT_DOOR = "LEAVE_AT_DOOR",
  LEAVE_WITH_GAURD = "LEAVE_WITH_GAURD",
  PET_AT_HOME = "PET_AT_HOME",
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

  @ApiProperty({
    enum: DELIVERY_INSTRUCTION,
    enumName: "Delivery Instruction",
    type: [DELIVERY_INSTRUCTION],
    isArray: true,
  })
  @IsEnum(DELIVERY_INSTRUCTION, { each: true })
  deliveryInstruction?: DELIVERY_INSTRUCTION[];

  @ApiProperty({ enum: PAYMENTMODE, enumName: "Payment Type" })
  @IsString()
  @IsEnum(PAYMENTMODE)
  paymentMode?: PAYMENTMODE = PAYMENTMODE?.COD;
}
