import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from "class-validator";
class Document {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  number: string;
}
export class RegisterDocumentDTO {
  @ApiProperty({ type: () => [Document] }) // Specify the type of the array elements
  @IsArray()
  @ValidateNested({ each: true }) // Ensure each element of the array is validated
  @Type(() => Document) // Ensure proper transformation of nested objects
  documents: Document[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
