import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { CreateProductDTO } from "./dto/create-product.dto";
import { GetProductDTO } from "./dto/get-product.dto";
import { AuthGuard } from "src/guards/auth.guards";
import { GetCategoryOfProducts } from "./dto/get-categoryOfProduct.dto";
import { ObjectId } from "mongodb";
import { GetProductByCategory } from "./dto/get-productByCategory.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags("Products")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: "Add Product" })
  @ApiBody({
    description: "Product Detail",
    type: CreateProductDTO,
  })
  @Post("add")
  @HttpCode(HttpStatus.CREATED)
  addProduct(
    @Req() { user: { sub } }: any,
    @Body() createProductDTO: CreateProductDTO
  ) {
    return this.productService.addProduct(sub, createProductDTO);
  }

  @ApiOperation({ summary: "Get All Products" })
  @Get("")
  @HttpCode(HttpStatus.OK)
  getAllProcucts(@Req() { sub }: any, @Query() getProductDTO: GetProductDTO) {
    return this.productService.getAllProcucts(sub, getProductDTO);
  }

  @Get("category_of_products")
  @ApiQuery({ name: "storeId", type: String, required: true })
  @ApiQuery({ name: "page", type: String, required: true })
  @ApiQuery({ name: "limit", type: String, required: true })
  @ApiQuery({ name: "search", type: String, required: false })
  @ApiOperation({ summary: "Get category of Products from a specific store." })
  @HttpCode(HttpStatus.OK)
  getCategoryOfStore(
    @Query() categoryOfProducts: GetCategoryOfProducts,
    @Req() { user: { sub } }: any
  ) {
    return this.productService.getCategoryOfStore(categoryOfProducts, sub);
  }

  @Get("products_by_category")
  @ApiQuery({ name: "categoryId", type: String, required: true })
  @ApiQuery({ name: "page", type: String, required: true })
  @ApiQuery({ name: "limit", type: String, required: true })
  @ApiQuery({ name: "search", type: String, required: false })
  @ApiOperation({ summary: "Get Products of a specific Category." })
  @HttpCode(HttpStatus.OK)
  getProductByASpecificCategory(
    @Query() getProductByCategory: GetProductByCategory,
    @Req() { user: { sub } }: any
  ) {
    try {
      return this.productService.getProductByASpecificCategory(
        getProductByCategory,
        sub
      );
    } catch (error) {
      throw new CustomHttpException(error.message)
    }
  }
}
