import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guards";
import { UpdateOrderStatusDTO } from "./dto/update-status.dto";
import { OrderHistoryDTO, ORDERSTATUS } from "./dto/order-history.dto";
import { Public } from "src/decorators/public.decorator";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { GetOrdersDTO } from "./dto/get-orders.dto";
import mongoose from "mongoose";

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
  constructor(readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: "Create Order" })
  @HttpCode(HttpStatus.CREATED)
  @Post("/create")
  createOrder(
    @Body() createOrderDTO: CreateOrderDTO,
    @Req() { user: { sub } }: any
  ) {
    return this.ordersService.createOrder(sub, createOrderDTO);
  }

  @ApiOperation({ summary: "Get All orders of a specific user" })
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: "orderStatus", type: String, required: true })
  @ApiQuery({ name: "orderType", type: String, required: true })
  @ApiQuery({ name: "day", type: String, required: false })
  @ApiQuery({ name: "page", type: String, required: false })
  @ApiQuery({ name: "limit", type: String, required: false })
  @Get("/getOrders-user")
  getAllOrderOfSpeciificUser(
    @Req() { user: { sub } }: any,
    @Query() getOrdersDTO: GetOrdersDTO
  ) {
    return this.ordersService.getAllOrderOfSpeciificUser(sub, getOrdersDTO);
  }

  @ApiOperation({ summary: "Get a specific order" })
  @ApiParam({ name: "id", type: String, description: "Order ID" })
  @HttpCode(HttpStatus.OK)
  @Get("/getOrderById/:id")
  getASpecificOrderById(
    @Req() { user: { sub } }: any,
    @Param("id") id: mongoose.ObjectId
  ) {
    return this.ordersService.getASpecificOrderById(sub, id);
  }

  @Get("/delivered")
  @ApiOperation({ summary: "Get Analytics Report of Delivered Order" })
  @HttpCode(HttpStatus.OK)
  getDeliveredOrderDetails(@Req() { user: { sub } }: any) {
    return this.ordersService.getDeliveredOrderDetails(sub);
  }

  @Get("/rejected")
  @ApiOperation({ summary: "Get Analytics Report of Rejected Order" })
  @HttpCode(HttpStatus.OK)
  getRejectedOrderDetails(@Req() { sub }: any) {
    return this.ordersService.getRejectedOrderDetails(sub);
  }

  @Get("/topRatedOrders")
  @ApiOperation({ summary: "Get Analytics Report of Top  Orders" })
  @HttpCode(HttpStatus.OK)
  getTopRatedOrders(@Req() { sub }: any) {
    return this.ordersService.getTopRatedOrders(sub);
  }

  @Get("/currentOrders")
  @ApiOperation({ summary: "Get Current Orders by user" })
  @HttpCode(HttpStatus.OK)
  getCurrentOrders(@Req() { user: { sub } }: any) {
    console.log("hit");
    return this.ordersService.getCurrentOrders(sub);
  }

  @Post("/updateStatus")
  @ApiOperation({ summary: "Update Order Status" })
  @ApiBody({ type: UpdateOrderStatusDTO })
  @HttpCode(HttpStatus.OK)
  updateStatus(
    @Req() { user: { sub } }: any,
    @Body() updateOrderStatusDTO: UpdateOrderStatusDTO
  ) {
    return this.ordersService.updateStatus(sub, updateOrderStatusDTO);
  }

  @Public()
  @ApiBearerAuth()
  @Get("/orderHistory")
  @ApiOperation({ summary: "Order History with Pagination nad filter" })
  @HttpCode(HttpStatus.OK)
  orderHistory(@Req() { sub }: any, @Query() orderHistoryDTO: OrderHistoryDTO) {
    return this.ordersService.orderHistory(sub, orderHistoryDTO);
  }
}
