import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsStrongPassword } from "class-validator";

export class ResetPasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
