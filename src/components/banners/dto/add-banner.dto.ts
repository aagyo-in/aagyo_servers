import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";

class File {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  filePath: string;
}

export class AddBannerDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isSponsor: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isInStore: boolean;

  @ApiProperty({ type: [File] })
  @ValidateNested({ each: true })
  @Type(() => File)
  files: File[];
}
