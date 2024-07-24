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
  Query,
} from "@nestjs/common";
import { BannersService } from "./banners.service";
import { AddBannerDto } from "./dto/add-banner.dto";
import { AuthGuard } from "src/guards/auth.guards";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags("Banners")
@Controller("banner")
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @ApiOperation({ summary: "Add Banner" })
  @ApiBody({ type: AddBannerDto })
  @HttpCode(HttpStatus.CREATED)
  @Post("add")
  addBanner(@Body() addBannerDto: AddBannerDto, @Req() { user: { sub } }: any) {
    return this.bannersService.addBanner(addBannerDto, sub);
  }

  @ApiOperation({ summary: "Get All Banners of a specific user" })
  @HttpCode(HttpStatus.OK)
  @Get("")
  getBanners(@Req() { user: { sub } }: any) {
    return this.bannersService.getBanners(sub);
  }

  @ApiOperation({ summary: "Get All Sponsored Banners from all stores" })
  @HttpCode(HttpStatus.OK)
  @Get("/get-allStores")
  getAllBannersFromAllStores(@Req() { user: { sub } }: any) {
    return this.bannersService.getAllBannersFromAllStores(sub);
  }

  @ApiOperation({ summary: "Delete a specific banner!" })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", type: String })
  @Get("delete/:id")
  deleteBanner(@Req() { user: { sub } }: any, @Param("id") id: any) {
    return this.bannersService.deleteBanner(id);
  }
}
