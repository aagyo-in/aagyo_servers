import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  Delete,
  Patch,
  UseGuards,
} from "@nestjs/common";

import { CustomerEnquaryService } from "./customerEnquary.service";
import { CreateCustomerEnquaryDTO } from "./dto/create-CustomerEnquary.dto";
import { SortFilterDTO } from "src/common/DTO/sortFilter.dto";
import { AuthGuard } from "src/guards/auth.guards";

@Controller("shippingCharge")
export class CustomerEnquaryController {
  constructor(
    private readonly customerEnquaryService: CustomerEnquaryService
  ) {}

  @Get("")
  @HttpCode(HttpStatus.OK)
  getAllDiscountOffer(@Query() sortFilterDTO: SortFilterDTO) {
    return this.customerEnquaryService.getAllCustomerEnquary(sortFilterDTO);
  }

  @Get("get/:id")
  @HttpCode(HttpStatus.OK)
  getDiscountOfferById(@Param("id") id: Object) {
    return this.customerEnquaryService.getCustomerEnquaryById(id);
  }

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  createDiscountOffer(
    @Body() createCustomerEnquaryDTO: CreateCustomerEnquaryDTO
  ) {
    return this.customerEnquaryService.createCustomerEnquary(
      createCustomerEnquaryDTO
    );
  }

  @Patch("update/:id")
  @HttpCode(HttpStatus.OK)
  updateDiscountOffer(
    @Param("id") id: Object,
    @Body() createCustomerEnquaryDTO: CreateCustomerEnquaryDTO
  ) {
    return this.customerEnquaryService.updateCustomerEnquary(
      id,
      createCustomerEnquaryDTO
    );
  }

  @Delete("delete/:id")
  @HttpCode(HttpStatus.OK)
  deleteDiscountOffer(@Param("id") id: Object) {
    return this.customerEnquaryService.deleteCustomerEnquary(id);
  }
}
