import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Max,
  Min,
  isEmail,
  isNotEmpty,
  isObject,
  isPhoneNumber,
  isString,
} from "class-validator";

export class CreateUnitDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
