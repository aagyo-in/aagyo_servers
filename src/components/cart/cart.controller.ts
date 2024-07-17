import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { AddCartDto } from "./dto/add-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guards";

@UseGuards(AuthGuard)
@ApiTags("Cart")
@ApiBearerAuth()
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: "Add to Cart" })
  @HttpCode(HttpStatus.CREATED)
  @Post("add")
  addToCart(@Req() { user: { sub } }: any, @Body() addCartDto: AddCartDto) {
    return this.cartService.addToCart(sub, addCartDto);
  }

  @ApiOperation({ summary: "Get Cart" })
  @HttpCode(HttpStatus.OK)
  @Post("get")
  getCart(@Req() { user: { sub } }: any) {
    return this.cartService.getCart(sub);
  }

  @ApiOperation({ summary: "Delete Item from Cart" })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", type: String })
  @Post("get/:id")
  deleteFromCart(@Req() { user: { sub } }: any, @Param("id") id: any) {
    return this.cartService.deleteFromCart(sub,id);
  }
}
