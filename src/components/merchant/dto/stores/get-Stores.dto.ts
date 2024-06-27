import { ApiProperty, OmitType } from "@nestjs/swagger";
import { MerchantSortFilterDTO } from "../merchantSortFilterDTO";

export class GetStoresDTO extends OmitType(MerchantSortFilterDTO, [
  "zone",
  "city",
] as const) {}
