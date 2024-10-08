import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { ObjectId } from "mongodb";

enum DISCOUNT_TYPE {
  PERCENT = "PERCENT",
  AMOUNT = "AMOUNT",
}
class FILES {
  @ApiProperty()
  @IsOptional()
  @IsString()
  fileName: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  filePath: string;
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
  @IsString()
  weigthOrCount: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const numberValue = Number(value);
    return isNaN(numberValue) ? value : numberValue;
  })
  sort?: number;
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
}

export class CreateProductDTO {
  @ApiProperty({ type: [String], description: "Array of category Ids" })
  @IsArray()
  @IsString({ each: true })
  categoryId: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  masterCategory?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: [FILES] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FILES)
  productImage: FILES[];

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
  isOrganic?: boolean;
  sort?: number;
  @ApiProperty({ type: [VARIENTS] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VARIENTS)
  varients: VARIENTS[];
}
