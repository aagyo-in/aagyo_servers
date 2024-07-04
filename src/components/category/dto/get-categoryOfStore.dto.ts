import { ApiProperty, OmitType } from "@nestjs/swagger";
import { MerchantSortFilterDTO } from "../../merchant/dto/merchantSortFilterDTO";

export class GetStoresCategory extends OmitType(MerchantSortFilterDTO, [
  "zone",
  "city",
] as const) {}
