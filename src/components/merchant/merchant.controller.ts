import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { MerchantService } from "./merchant.service";
import { CreateMerchantDTO } from "./dto/createMerchant.dto";
import { MerchantSortFilterDTO } from "./dto/merchantSortFilterDTO";
import { ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { StoreStatus } from "./dto/store-Status.dto";
import { AuthGuard } from "src/guards/auth.guards";
import { Public } from "src/decorators/public.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

@UseGuards(AuthGuard)
@ApiTags("Merchant")
@Controller("/merchant")
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Public()
  @Get("/")
  @HttpCode(HttpStatus.OK)
  getAllMerchants(@Query() merchantSortFilterDTO: MerchantSortFilterDTO) {
    console.log("hit");
    return this.merchantService.getAllMerchants(merchantSortFilterDTO);
  }

  @Public()
  @Get("/get/:id")
  @HttpCode(HttpStatus.OK)
  getMerchantById(@Param("id") id: string) {
    return this.merchantService.getMerchantById(id);
  }

  @Public()
  @Post("/create")
  @ApiOperation({ summary: "Register Merchant" })
  @ApiBody({
    schema: {},
  })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor("file"))
  createMerchant(
    @Body() createMerchantDTO: CreateMerchantDTO,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.merchantService.createMerchant(createMerchantDTO);
  }

  @Public()
  @Patch("/update/:id")
  @ApiOperation({ summary: "Update Merchant Details using id" })
  @HttpCode(HttpStatus.CREATED)
  updateMerchant(
    @Body() createMerchantDTO: CreateMerchantDTO,
    @Param("id") id: Object
  ) {
    return this.merchantService.updateMerchant(id, createMerchantDTO);
  }

  @Public()
  @Get("/getAllStoresName")
  @HttpCode(HttpStatus.OK)
  getAllStoresName() {
    return this.merchantService.getAllStoresName();
  }

  @Public()
  @Patch("/storeStatus/:merchantId")
  @ApiOperation({ summary: "Update Store is open or Close" })
  @ApiParam({
    name: "merchantId",
    description: "ID of the Merchnat",
    type: String,
  })
  @HttpCode(HttpStatus.OK)
  isStoreOpenStatus(
    @Param("merchantId") merchantId: any,
    @Body() storeStatus: StoreStatus
  ) {
    return this.merchantService.isStoreOpenStatus(merchantId, storeStatus);
  }

  @Get("profileDetail/:merchantId")
  @ApiParam({
    name: "merchantId",
    description: "ID of the Merchnat",
    type: String,
  })
  @ApiOperation({ summary: "Get  Merchant's Profile Detail" })
  @HttpCode(HttpStatus.OK)
  getProfileDetail(@Param("merchantId") merchantId: any) {
    return this.merchantService.getProfileDetail(merchantId);
  }
}
