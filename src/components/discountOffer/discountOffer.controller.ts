import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  Delete,
  Patch,
} from "@nestjs/common";
import { DiscountOfferService } from "./discountOffer.service";
import { CreateDiscountDTO } from "./dto/createDiscount.dto";
import { SortFilterDTO } from "../../common/DTO/sortFilter.dto";

@Controller("discountOffer")
export class DiscountOfferController {
  constructor(private readonly discountOfferService: DiscountOfferService) {}

  @Get("")
  @HttpCode(HttpStatus.OK)
  getAllDiscountOffer(@Query() sortFilterDTO: SortFilterDTO) {
    return this.discountOfferService.getAllDiscountOffer(sortFilterDTO);
  }

  @Get("get/:id")
  @HttpCode(HttpStatus.OK)
  getDiscountOfferById(@Param("id") id: Object) {
    return this.discountOfferService.getDiscountOfferById(id);
  }

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  createDiscountOffer(@Body() createDiscountDTO: CreateDiscountDTO) {
    return this.discountOfferService.createDiscountOffer(createDiscountDTO);
  }

  @Patch("update/:id")
  @HttpCode(HttpStatus.OK)
  updateDiscountOffer(
    @Param("id") id: Object,
    @Body() createDiscountDTO: CreateDiscountDTO
  ) {
    return this.discountOfferService.updateDiscountOffer(id, createDiscountDTO);
  }

  @Delete("delete/:id")
  @HttpCode(HttpStatus.OK)
  deleteDiscountOffer(@Param("id") id: Object) {
    return this.discountOfferService.deleteDiscountOffer(id);
  }
}
