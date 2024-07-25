import { PickType } from "@nestjs/swagger";
import { AddSponsoredBannerDto } from "./add-sponsoredBanner.dto";

export class InStoreBannerDTO extends PickType(AddSponsoredBannerDto, [
  "files",
] as const) {}
