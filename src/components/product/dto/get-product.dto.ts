import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetProductDTO {
  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  readonly search?: string = "";

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  readonly limit?: string = "10";

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  readonly page?: string = "1";
}
