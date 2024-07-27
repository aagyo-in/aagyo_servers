import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  MinLength,
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

export class AddSponsoredBannerDto {
  @ApiProperty({ type: [File] })
  @ValidateNested({ each: true })
  @IsArray({})
  @MinLength(1)
  @Type(() => File)
  files: File[];

  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty()
  @IsDateString()
  timeFrom: Date;

  @ApiProperty()
  @IsDateString()
  timeTo: Date;
}
