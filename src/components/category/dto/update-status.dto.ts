import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsObject, IsString } from "class-validator";

export class CategoryStatusDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
