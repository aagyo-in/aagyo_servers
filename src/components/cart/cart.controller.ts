import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Param,
  Delete,
  Get,
  Patch,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { AddCartDto } from "./dto/add-cart.dto";
import { UpdateCartDTO } from "./dto/update-cart.dto";
import {
  ApiBearerAuth,
  ApiBody,
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
  @Get("")
  getCart(@Req() { user: { sub } }: any) {
    return this.cartService.getCart(sub);
  }

  @ApiOperation({ summary: "Delete Item from Cart" })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "varientId", type: String })
  @Delete("delete/:varientId")
  deleteFromCart(
    @Req() { user: { sub } }: any,
    @Param("varientId")
    varientId: any
  ) {
    return this.cartService.deleteFromCart(sub, varientId);
  }

  @ApiOperation({ summary: "Update Item from Cart" })
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({ name: "varientId", type: String })
  @ApiBody({ type: UpdateCartDTO })
  @Patch("update/:varientId")
  updateCartItem(
    @Req() { user: { sub } }: any,
    @Param("varientId")
    varientId: any,
    @Body() updateCartDTO: UpdateCartDTO
  ) {
    return this.cartService.updateCartItem(sub, varientId, updateCartDTO);
  }
}
