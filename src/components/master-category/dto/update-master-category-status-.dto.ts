import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class MasterCategoryStatusDTO {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
