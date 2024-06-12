import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";

export enum Status {
  ON = "ON",
  INACTIVE = "INACTIVE",
  OFF = "OFF",
}

export class CreateZoneDTO {
  @IsNotEmpty()
  @IsString()
  readonly state: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly lattitude: string;

  @IsNotEmpty()
  @IsString()
  readonly longitude: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsEnum(Status)
  readonly status: Status=Status.ON
}
