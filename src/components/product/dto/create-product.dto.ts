import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { ObjectId } from "mongodb";

enum DISCOUNT_TYPE {
  PERCENT = "PERCENT",
  AMOUNT = "AMOUNT",
}
export class VARIENTS {
  @ApiProperty()
  @IsOptional()
  @IsString()
  discountType: DISCOUNT_TYPE = DISCOUNT_TYPE.AMOUNT;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const numberValue = Number(value);
    return isNaN(numberValue) ? value : numberValue;
  })
  discount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const numberValue = Number(value);
    return isNaN(numberValue) ? value : numberValue;
  })
  mrp: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const numberValue = Number(value);
    return isNaN(numberValue) ? value : numberValue;
  })
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const numberValue = Number(value);
    return isNaN(numberValue) ? value : numberValue;
  })
  weightOrCount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const numberValue = Number(value);
    return isNaN(numberValue) ? value : numberValue;
  })
  totalStock: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const numberValue = Number(value);
    return isNaN(numberValue) ? value : numberValue;
  })
  purchaseQuantity: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  short: string;

  @ApiProperty({ type: "string", format: "binary" })
  productImage: File;
}

export class CreateProductDTO {
  @ApiProperty({ type: [String], description: "Array of category IDs" })
  @IsNotEmpty()
  categoryId: [ObjectId];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: [String], description: "Array of Tags " })
  @IsOptional()
  tags: [String];

  @ApiProperty({ type: [String], description: "Array of Keywords " })
  @IsOptional()
  keywords: [string];

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    const boolValue = Boolean(value);
    return boolValue;
  })
  isOrganic: boolean;

  @ApiProperty({ type: [VARIENTS] })
  @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => VARIENTS)
  varients: VARIENTS[];
}
