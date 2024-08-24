import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { MasterCategoryService } from "./master-category.service";
import { CreateMasterCategoryDTO } from "./dto/create-master-category.dto";
import { AuthGuard } from "src/guards/auth.guards";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateMasterCategoryDTO } from "./dto/update-master-category.dto";
import { GetMasterCategory } from "./dto/get-category.dto";
import { MasterCategoryStatusDTO } from "./dto/update-master-category-status-.dto";
import { ObjectId } from "mongoose";
import { EditMasterCategoryDTO } from "./dto/edit-master-category.dto";

@ApiBearerAuth()
@ApiTags("Master Category")
@Controller("master-category")
export class MasterCategoryController {
  constructor(private readonly masterCategoryService: MasterCategoryService) {}

  // get master category
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get Master Category" })
  @Get()
  @ApiQuery({ name: "page", type: String, required: true })
  @ApiQuery({ name: "limit", type: String, required: true })
  @ApiQuery({ name: "search", type: String, required: false })
  @HttpCode(HttpStatus.OK)
  getAllCategory(@Query() getMasterCategory: GetMasterCategory) {
    return this.masterCategoryService.getCategory(getMasterCategory);
  }

  // get master category (id and name)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get Master Category" })
  @Get("option")
  @HttpCode(HttpStatus.OK)
  getAllCategoryIdName() {
    return this.masterCategoryService.getCategoryIdName();
  }

  // get master category by id
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get Master Category By Id" })
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  getAllCategoryById(@Param("id") id: string) {
    return this.masterCategoryService.getCategoryById(id);
  }

  //create master category
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Create Master Category" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        file: {
          type: "file",
          format: "binary",
        },
      },
    },
  })
  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor("file"))
  createMasterCategory(
    @Req() { user }: any,
    @Body() createMasterCategoryDTO: CreateMasterCategoryDTO,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.masterCategoryService.createMasterCategory(
      user,
      createMasterCategoryDTO,
      file
    );
  }

  // update master category status
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update Master Category Status" })
  @ApiParam({ name: "id", description: "Category Id" })
  @ApiBody({ type: MasterCategoryStatusDTO })
  @Patch("updateStatus/:id")
  @HttpCode(HttpStatus.OK)
  updateMasterCategoryStatus(
    @Param("id") id: string,
    @Body() masterCategoryStatusDTO: MasterCategoryStatusDTO
  ) {
    return this.masterCategoryService.updateMasterCategoryStatus(
      id,
      masterCategoryStatusDTO
    );
  }

  //edit master category (name, image)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Edit Master Category" })
  @Patch("edit/:id")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("file"))
  async EditMasterCategory(
    @Req() { user }: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() editMasterCategoryDTO: EditMasterCategoryDTO,
    @Param("id") id: string
  ) {
    return this.masterCategoryService.EditMasterCategory(
      id,
      editMasterCategoryDTO,
      file
    );
  }

  // update master category
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update Master Category" })
  @ApiParam({ name: "id", type: String })
  @Patch("update/:id")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("file"))
  updateMasterCategory(
    @Body() updateMasterCategoryDTO: UpdateMasterCategoryDTO,
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.masterCategoryService.updateMasterCategory(
      updateMasterCategoryDTO,
      id
    );
  }

  // delete category
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Delete Master Category by ID" })
  @ApiParam({ name: "id", description: "Category Id" })
  @Delete("delete/:id")
  @HttpCode(HttpStatus.OK)
  deleteCategoryById(@Param("id") id: string) {
    return this.masterCategoryService.deleteMasterCategoryById(id);
  }
}
