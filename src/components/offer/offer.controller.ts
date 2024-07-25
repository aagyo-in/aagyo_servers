import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from "@nestjs/common";
import { OfferService } from "./offer.service";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guards";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags("Offers")
@Controller("offer")
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @ApiOperation({ summary: "Add Coupon." })
  @ApiBody({ type: CreateOfferDto })
  @HttpCode(HttpStatus.CREATED)
  @Post("create")
  createCoupon(
    @Body() createOfferDto: CreateOfferDto,
    @Req() { user: { sub } }: any
  ) {
    return this.offerService.createCoupon(sub, createOfferDto);
  }

  @ApiOperation({ summary: "Get Coupons of Store." })
  @HttpCode(HttpStatus.OK)
  @Get("get")
  getCoupon(@Req() { user: { sub } }: any) {
    return this.offerService.getCoupon(sub);
  }

  @ApiOperation({ summary: "Update Coupon" })
  @HttpCode(HttpStatus.OK)
  @Patch("update:id")
  update(@Param("id") id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(id, updateOfferDto);
  }

  @ApiOperation({ summary: "Delete Coupon" })
  @HttpCode(HttpStatus.OK)
  @Delete("delete:id")
  remove(@Param("id") id: string) {
    return this.offerService.remove(id);
  }

  @ApiOperation({ summary: "Get a Coupon By  Coupon Id" })
  @HttpCode(HttpStatus.OK)
  @Get("delete:id")
  getById(@Param("id") id: string) {
    return this.offerService.getById(id);
  }
}
