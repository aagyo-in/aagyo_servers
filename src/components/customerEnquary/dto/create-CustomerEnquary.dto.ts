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
  
  export class CreateCustomerEnquaryDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsNotEmpty()
    @IsPhoneNumber()
    readonly phone: string;
  
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
  
    @IsNotEmpty()
    @IsArray()
    readonly authority: [any];
  
    @IsNotEmpty()
    @IsString()
    readonly operatingZone: string;
  }
  