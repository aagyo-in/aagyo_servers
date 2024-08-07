import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateCategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @ApiProperty()
  @IsNumber()
  sort: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsNumber()
  instruction: string[];
}
