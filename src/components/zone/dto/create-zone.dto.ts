import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString,
} from "class-validator";
import { isTypedArray } from "util/types";

class MapPath {
  @ApiProperty()
  @IsString()
  private readonly lattitude: string;

  @ApiProperty()
  @IsString()
  private readonly longitude: string;
}

export class CreateZoneDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  private zone: string;

  @ApiProperty()
  @IsBoolean()
  private isActive: boolean = false;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  private city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  private state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  private country: string;

  @ApiProperty({ type: [MapPath] })
  @IsArray()
  private mapPath: MapPath[];
}
