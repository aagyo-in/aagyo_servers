import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Param,
  Patch,
  Query,
} from "@nestjs/common";
import { BannersService } from "./banners.service";
import { AddSponsoredBannerDto } from "./dto/add-sponsoredBanner.dto";
import { AuthGuard } from "src/guards/auth.guards";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { InStoreBannerDTO } from "./dto/add-InStoreBanner.dto";
import { UpdateBannerDto } from "./dto/update-banner.dto";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags("Banners")
@Controller("banner")
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @ApiOperation({ summary: "Add Sponsored Banner" })
  @ApiBody({ type: AddSponsoredBannerDto })
  @HttpCode(HttpStatus.CREATED)
  @Post("add-sponsor")
  addSponsoredBanner(
    @Body() addBannerDto: AddSponsoredBannerDto,
    @Req() { user: { sub } }: any
  ) {
    return this.bannersService.addSponsoredBanner(addBannerDto, sub);
  }

  @ApiOperation({ summary: "Add In Store Banner" })
  @ApiBody({ type: InStoreBannerDTO })
  @HttpCode(HttpStatus.CREATED)
  @Post("add-inStore")
  addInStoreBanner(
    @Body() inStoreBannerDTO: InStoreBannerDTO,
    @Req() { user: { sub } }: any
  ) {
    return this.bannersService.addInStoreBanner(inStoreBannerDTO, sub);
  }

  @ApiOperation({ summary: "Get All Sponsor Banners of a specific Store" })
  @HttpCode(HttpStatus.OK)
  @Get("get-sponsor")
  getSponsorBanners(@Req() { user: { sub } }: any) {
    return this.bannersService.getSponsorBanners(sub);
  }

  @ApiOperation({ summary: "Get All In Store Banners of a specific Store" })
  @HttpCode(HttpStatus.OK)
  @Get("get-inStore")
  getInStore(@Req() { user: { sub } }: any) {
    return this.bannersService.getInStore(sub);
  }

  @ApiOperation({ summary: "Get All Sponsored Banners from all stores" })
  @HttpCode(HttpStatus.OK)
  @Get("/get-banner-allStores")
  getAllBannersFromAllStores(@Req() { user: { sub } }: any) {
    return this.bannersService.getAllBannersFromAllStores(sub);
  }

  @ApiOperation({ summary: "Update Sponsored Banners." })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", type: String })
  @Patch("/update-sponsorBanner/:id")
  updateSponsorBanner(
    @Req() { user: { sub } }: any,
    @Body() updateBannerDto: UpdateBannerDto,
    @Param("id") id: any
  ) {
    return this.bannersService.updateSponsorBanner(id, updateBannerDto);
  }

  @ApiOperation({ summary: "Delete a specific banner!" })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", type: String })
  @Get("delete/:id")
  deleteBanner(@Req() { user: { sub } }: any, @Param("id") id: any) {
    return this.bannersService.deleteBanner(id);
  }

  @ApiOperation({ summary: "Delete a specific banner!" })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", type: String })
  @ApiQuery({ name: "isAtive", type: Boolean })
  @Get("update-status/:id")
  updateStatusOfBanner(
    @Param("id") id: any,
    @Query("isActive") isActive: Boolean
  ) {
    return this.bannersService.updateStatusOfBanner(id,isActive);
  }
}
