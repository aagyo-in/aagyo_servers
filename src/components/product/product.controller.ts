import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateProductDTO } from "./dto/create-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetProductDTO } from "./dto/get-product.dto";
import { AuthGuard } from "src/guards/auth.guards";

@UseGuards(AuthGuard)
@ApiTags("Products")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: "Add Product" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Product Detail",
    type: CreateProductDTO,
  })
  @Post("add")
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor("productImage"))
  addProduct(
    @Req() { sub }: any,
    @Body() createProductDTO: CreateProductDTO,
    @UploadedFile()
    productImage: Express.Multer.File
  ) {
    if (!productImage) {
      throw new HttpException(
        "Product image is required",
        HttpStatus.BAD_REQUEST
      );
    }
    return this.productService.addProduct(sub, createProductDTO, productImage);
  }

  @ApiOperation({ summary: "Get All Products" })
  @Get("")
  @HttpCode(HttpStatus.OK)
  getAllProcucts(@Req() { sub }: any, @Query() getProductDTO: GetProductDTO) {
    return this.productService.getAllProcucts(sub, getProductDTO);
  }
}
