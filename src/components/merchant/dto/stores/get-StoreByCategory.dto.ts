import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { MerchantSortFilterDTO } from "../merchantSortFilterDTO";
import { IsObject, IsString } from "class-validator";

class AdditionalDTO {
  @ApiProperty()
  @IsString()
  categoryId: string;
}

export class GetStoreByCategory extends IntersectionType(
  MerchantSortFilterDTO,
  AdditionalDTO
) {}
