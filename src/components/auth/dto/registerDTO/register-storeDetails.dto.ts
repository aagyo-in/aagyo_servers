import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class RegisterStoreDetailDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  storeName: string;

  @ApiProperty({ type: [String], description: "Array of category names" })
  @IsArray()
  @IsString({ each: true })
  category: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ type: "string", format: "binary" })
  storeImage: any;
}
