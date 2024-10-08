import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty, 
  IsString,
} from "class-validator";

export class CreateMasterCategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string; 
}
