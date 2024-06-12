import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ObjectId } from "mongodb";

export class CreateProductDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: ObjectId;

  @ApiProperty()
  @IsOptional()
  @IsString()
  unitId: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  tags: String[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  keywords: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  attributes: any[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  varients: any[];

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
  maxPurchaseQuantity: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  isOrganic: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  discountType: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const numberValue = Number(value);
    return isNaN(numberValue) ? value : numberValue;
  })
  discount: number;

  @ApiProperty({ type: "string", format: "binary" })
  productImage: File;
}
