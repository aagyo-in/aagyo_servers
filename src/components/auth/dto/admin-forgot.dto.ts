import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty } from "class-validator";

export class ForgotPasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNotEmpty()
  email: string;
}
