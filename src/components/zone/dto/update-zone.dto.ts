import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { CreateZoneDto } from "./create-zone.dto";
import { IsArray, IsNumber, IsString } from "class-validator";

export class AdditionalDTO {
  @ApiProperty()
  @IsArray()
  zoneCategory: [string];

  @ApiProperty()
  @IsArray()
  minimumOrderAmount: [
    {
      minimumuOrderValue: string;
      areaRangeInKM: number;
    },
  ];

  @ApiProperty()
  @IsString()
  chargeType: string;

  @ApiProperty()
  @IsNumber()
  deliveryChargePerKM: number;

  @ApiProperty()
  @IsNumber()
  initialDeliveryCharge: number;

  @ApiProperty()
  @IsNumber()
  initialKmForInitialDeliveryCharge: number;

  @ApiProperty()
  @IsArray()
  otherCharges: [
    {
      chargeName: string;
      amount: number;
    },
  ];
}
export class UpdateZoneDto extends IntersectionType(
  CreateZoneDto,
  AdditionalDTO
) {}
