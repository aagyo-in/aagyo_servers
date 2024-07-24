import { PartialType } from "@nestjs/swagger";
import { AddBannerDto } from "./add-banner.dto";

export class UpdateBannerDto extends PartialType(AddBannerDto) {}
