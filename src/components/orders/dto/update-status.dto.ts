import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

enum ORDERSTATUS {
  DUE = "DUE",
  PROCESSING = "PROCESSING",
  READYTOPICK = "READY TO PICK",
  ONTHEWAY = "ON THE WAY",
  DELIVERED = "DELIVERED",
  REJECTED = "REJECTED",
  CANCEL = "CANCEL",
  DENY = "DENY",
}

export class UpdateOrderStatusDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @ApiProperty({ enum: ORDERSTATUS, enumName: "Update Order Status" })
  @IsNotEmpty()
  @IsString()
  @IsEnum(ORDERSTATUS)
  orderStatus: ORDERSTATUS;

  @ApiProperty()
  @IsOptional()
  @IsString()
  rejectReason: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  prepareationTime: string;
}
