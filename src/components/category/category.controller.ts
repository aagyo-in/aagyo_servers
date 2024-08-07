import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Delete,
  Query,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { CategoryStatusDTO } from "./dto/update-status.dto";
import { AuthGuard } from "src/guards/auth.guards";
import { ObjectId } from "mongodb";
import { GetProductsCategory } from "./dto/get-productsCategory.dto";
import { GetStoresCategory } from "./dto/get-categoryOfStore.dto";
import { UpdateCategoryDTO } from "./dto/update-category.dto";

@ApiBearerAuth()
@ApiTags("Category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Add Brand Category" })
  @Post("create-brand")
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor("file"))
  createBrandCategory(
    @Req() { user }: any,
    @Body() createCategoryDTO: CreateCategoryDTO,
    @UploadedFile()
    file: Express.Multer.File
  ) {
    return this.categoryService.createBrandCategory(
      user,
      createCategoryDTO,
      file
    );
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update Brand Category" })
  @ApiParam({ name: "id", type: String })
  @Post("update-brand/:id")
  @HttpCode(HttpStatus.OK)
  updateBrandCategory(
    @Req() { user }: any,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
    @Param("id") id: string
  ) {
    return this.categoryService.updateBrandCategory(
      user,
      updateCategoryDTO,
      id
    );
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Add Category" })
  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor("file"))
  createCategory(
    @Req() { user }: any,
    @Body() createCategoryDTO: CreateCategoryDTO,
    @UploadedFile()
    file: Express.Multer.File
  ) {
    return this.categoryService.createCategory(user, createCategoryDTO, file);
  }

  @Get("getAll")
  @HttpCode(HttpStatus.OK)
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get All Category with status and banner" })
  @Get("getAllWithStatus")
  @HttpCode(HttpStatus.OK)
  getAllCategoryWithStatus(@Req() { user }: any) {
    return this.categoryService.getAllCategoryWithStatus(user);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update Category Status" })
  @ApiParam({ name: "id", description: "Category Id" })
  @ApiBody({ type: CategoryStatusDTO })
  @Patch("updateStatus/:id")
  @HttpCode(HttpStatus.OK)
  updateCategoryStatus(
    @Param("id") id: any,
    @Body() categoryStatusDTO: CategoryStatusDTO
  ) {
    return this.categoryService.updateCategoryStatus(id, categoryStatusDTO);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Delete  Category by ID" })
  @Delete("delete/:id")
  @HttpCode(HttpStatus.OK)
  deleteCategoryById(@Param() id: ObjectId) {
    return this.categoryService.deleteCategoryById(id);
  }

  @UseGuards(AuthGuard)
  @Get("allstores-category")
  @ApiQuery({ name: "page", type: String, required: true })
  @ApiQuery({ name: "limit", type: String, required: true })
  @ApiQuery({ name: "search", type: String, required: false })
  @ApiOperation({
    summary: "Get All Category of Store.",
  })
  @HttpCode(HttpStatus.OK)
  getAllStoresCategory(
    @Query() getStoresCategory: GetStoresCategory,
    @Req() { user: { sub } }: any
  ) {
    return this.categoryService.getAllStoresCategory(sub, getStoresCategory);
  }

  @UseGuards(AuthGuard)
  @Get("category_of_products")
  @ApiQuery({ name: "merchantId", type: String, required: true })
  @ApiQuery({ name: "page", type: String, required: true })
  @ApiQuery({ name: "limit", type: String, required: true })
  @ApiQuery({ name: "search", type: String, required: false })
  @ApiOperation({
    summary: "Get category of Products from a specific store.",
  })
  @HttpCode(HttpStatus.OK)
  getCategoryOfStore(
    @Query() categoryOfProducts: GetProductsCategory,
    @Req() { user: { sub } }: any
  ) {
    return this.categoryService.getCategoryOfStore(categoryOfProducts, sub);
  }
}
