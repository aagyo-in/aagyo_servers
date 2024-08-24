import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class UpdateMasterCategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsNumber()
  sort: number;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  instructions: string[];
}
