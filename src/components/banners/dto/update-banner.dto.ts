import { PartialType } from "@nestjs/swagger";
import { AddSponsoredBannerDto } from "./add-sponsoredBanner.dto";

export class UpdateBannerDto extends PartialType(AddSponsoredBannerDto) {}
