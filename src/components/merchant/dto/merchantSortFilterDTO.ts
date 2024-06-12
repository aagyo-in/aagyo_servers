import { IsOptional, IsString } from "class-validator";

export class MerchantSortFilterDTO {
  @IsString()
  @IsOptional()
  readonly search?: string = "";

  @IsOptional()
  @IsString()
  readonly limit?: string = "1";

  @IsOptional()
  @IsString()
  readonly page?: string = "1";

  @IsOptional()
  @IsString()
  readonly zone?: string = "";

  @IsOptional()
  @IsString()
  readonly city?: string = "";


}

