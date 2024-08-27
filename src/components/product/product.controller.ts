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
  UploadedFile,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { CreateProductDTO } from "./dto/create-product.dto";
import { GetProductDTO } from "./dto/get-product.dto";
import { AuthGuard } from "src/guards/auth.guards";
import { GetProductByCategory } from "./dto/get-productByCategory.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { UpdateProductDTO } from "./dto/update-product.dto";

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
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDTO: CreateProductDTO
  ) {
    console.log("product controller pass");
    return this.productService.addProduct(sub, file, createProductDTO);
  }

  @ApiOperation({ summary: "Get All Products" })
  @Get("")
  @HttpCode(HttpStatus.OK)
  getAllProcucts(@Req() { sub }: any, @Query() getProductDTO: GetProductDTO) {
    return this.productService.getAllProcucts(sub, getProductDTO);
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
      throw new CustomHttpException(error.message);
    }
  }

  @Get("update-status/:id")
  @ApiQuery({ name: "isActive", type: Boolean })
  @ApiParam({ name: "id", type: String, required: true })
  @ApiOperation({ summary: "Update status of Products." })
  @HttpCode(HttpStatus.OK)
  updateStatus(
    @Param("id") id: string,
    @Query("isActive") isAvtive: boolean,
    @Req() { user: { sub } }: any
  ) {
    try {
      return this.productService.updateStatus(id, isAvtive);
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  @Get("get-product/:id")
  @ApiParam({ name: "id", type: String, required: true })
  @ApiOperation({ summary: "Get A Product By Id" })
  @HttpCode(HttpStatus.OK)
  getProductById(@Param("id") id: string, @Req() { user: { sub } }: any) {
    try {
      return this.productService.getProductById(id);
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  @Get("update-product/:id")
  @ApiParam({ name: "id", type: String, required: true })
  @ApiOperation({ summary: "Update A Product By Id" })
  @HttpCode(HttpStatus.OK)
  updateProductById(
    @Param("id") id: string,
    @Req() { user: { sub } }: any,
    @Body() updateProductDTO: UpdateProductDTO
  ) {
    try {
      console.log("uppppppdate id", id, updateProductDTO);
      return this.productService.updateProductById(id, updateProductDTO);
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
}
