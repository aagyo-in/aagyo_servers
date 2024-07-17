import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddCartDto {
  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty()
  @IsString()
  varientId: string;

  @ApiProperty({ type: Number, default: 1 })
  @IsNumber()
  quantity: number;
}
