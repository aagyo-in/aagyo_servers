import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber, 
  IsString,
} from "class-validator"; 

class MapPath {
  @ApiProperty()
  @IsNumber()
  private readonly lat: number;

  @ApiProperty()
  @IsNumber()
  private readonly lng: number;
}

export class EditZoneDto {
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
