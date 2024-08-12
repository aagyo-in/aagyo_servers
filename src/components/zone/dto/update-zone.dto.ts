import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { CreateZoneDto } from "./create-zone.dto";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

enum PAYMENTTYPE {
  ONLINE = "ONLINE",
  COD = "COD",
  BOTH = "BOTH",
}

class minumumnOrderAmount {
  @ApiProperty()
  @IsString()
  minimumuOrderValue: string;
  @ApiProperty()
  @IsNumber()
  areaRangeInKM: number;
}

class FIX {
  @ApiProperty()
  @IsNumber()
  uptoKm: number;
  @ApiProperty()
  @IsNumber()
  charge: number;
}

class OTHERCHARGES {
  @ApiProperty()
  @IsString()
  chargeName: string;
  @ApiProperty()
  @IsNumber()
  amount: number;
}

class PERKM {
  @ApiProperty()
  @IsNumber()
  perkmCharge: number;
  @ApiProperty()
  @IsNumber()
  initialCharge: number;
  @ApiProperty()
  @IsNumber()
  initialKm: number;
}
class ShippingCharge {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty({ type: PERKM })
  @IsObject()
  perKm: PERKM;

  @ApiProperty({ type: [FIX] })
  @IsArray()
  fix: FIX[];
}

export class AdditionalDTO {
  @ApiProperty({ enum: PAYMENTTYPE })
  @IsEnum(PAYMENTTYPE)
  paymentType: PAYMENTTYPE.BOTH;

  @ApiProperty()
  @IsArray()
  zoneCategory: [string];

  @ApiProperty({ type: [minumumnOrderAmount] })
  @IsArray()
  @ValidateNested({ each: true })
  minimumOrderAmount: minumumnOrderAmount[];

  @ApiProperty({ type: ShippingCharge })
  @IsObject()
  shippingCharge: ShippingCharge;

  @ApiProperty({ type: [OTHERCHARGES] })
  @IsArray()
  otherCharges: OTHERCHARGES[];
}
export class UpdateZoneDto extends IntersectionType(
  CreateZoneDto,
  AdditionalDTO
) {}
