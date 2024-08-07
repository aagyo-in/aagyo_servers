import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

class ProductRating {
  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  rating: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  description: [string];
}
export class CreateRatingDto {
  @ApiProperty({
    description: "ID of the delivery boy",
    example: 1, // Example value
    minimum: 1, // Minimum value for Swagger documentation
    maximum: 100, // Maximum value for Swagger documentation
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  deliveryBoyId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  rating: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  description: [string];

  @ApiProperty()
  @IsString()
  @IsOptional()
  review: string;

  @ApiProperty({ type: [ProductRating] })
  products: ProductRating[];
}
