import { IsOptional, IsString } from "class-validator";

export class AreaManagerSortFilterDTO {
  @IsString()
  @IsOptional()
  readonly search?: string = "";

  @IsOptional()
  @IsString()
  readonly limit?: string = "1";

  @IsOptional()
  @IsString()
  readonly page?: string = "1";
}
