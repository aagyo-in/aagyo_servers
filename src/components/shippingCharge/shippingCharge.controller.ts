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
import { ShippingChargeService } from "./shippingCharge.service";
import { CreateShippingChargeDTO } from "./dto/createShippingCharge.dto";
import { SortFilterDTO } from "../../common/DTO/sortFilter.dto";

@Controller("shippingCharge")
export class ShppingChargeController {
  constructor(private readonly shippingChargeService: ShippingChargeService) {}

  @Get("")
  @HttpCode(HttpStatus.OK)
  getAllShippingCharge(@Query() sortFilterDTO: SortFilterDTO) {
    return this.shippingChargeService.getAllShippingCharge(sortFilterDTO);
  }

  @Get("get/:id")
  @HttpCode(HttpStatus.OK)
  getShippingChargeById(@Param("id") id: Object) {
    return this.shippingChargeService.getShippingChargeById(id);
  }

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  createShippingCharge(
    @Body() createShippingChargeDTO: CreateShippingChargeDTO
  ) {
    return this.shippingChargeService.createShippingCharge(
      createShippingChargeDTO
    );
  }

  @Patch("update/:id")
  @HttpCode(HttpStatus.OK)
  updateShippingCharge(
    @Param("id") id: Object,
    @Body() createShippingChargeDTO: CreateShippingChargeDTO
  ) {
    return this.shippingChargeService.updateShippingCharge(
      id,
      createShippingChargeDTO
    );
  }

  @Delete("delete/:id")
  @HttpCode(HttpStatus.OK)
  deleteShippingCharge(@Param("id") id: Object) {
    return this.shippingChargeService.deleteShippingCharge(id);
  }
}
