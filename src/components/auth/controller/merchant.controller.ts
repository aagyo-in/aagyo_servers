import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { MerchantLoginDTO } from "../dto/merchantLogin.dto";
import { MerchantService } from "../service/merchant.service";
import { VerifyOTPDTO } from "../dto/verifyOTP.dto";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { RegisterStoreDetailDTO } from "../dto/registerDTO/register-storeDetails.dto";
import { RegisterOwnerDetailDTO } from "../dto/registerDTO/register-ownerDetail.dto";
import { RegisterBankDetailDTO } from "../dto/registerDTO/register-bankDetails.dto";
import { RegisterDocumentDTO } from "../dto/registerDTO/register-document.dto";
import { RegisterTime } from "../dto/registerDTO/register-registerTime.dto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/guards/auth.guards";

// @UseGuards(AuthGuard)
@ApiTags("Authantication Merchant")
@Controller("/merchant")
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post("/signIn")
  @ApiOperation({ summary: "SignIn Account (for send an OTP)" })
  signInAccountByPhone(
    @Body() merchantLoginDTO: MerchantLoginDTO
  ): Promise<{ message: string }> {
    return this.merchantService.signInAccountByPhone(merchantLoginDTO);
  }

  @Post("/verifyOTP")
  @ApiOperation({ summary: "Verify OTP" })
  verifyOTP(@Body() verifyOTPDTO: VerifyOTPDTO): Promise<any> {
    return this.merchantService.verifyOTP(verifyOTPDTO);
  }

  @UseGuards(AuthGuard)
  @Post("/register/ownerDetail")
  @ApiOperation({ summary: "Register Owner Detail " })
  @HttpCode(HttpStatus.CREATED)
  registerOwnerDetail(
    @Body() registerOwnerDetailDTO: RegisterOwnerDetailDTO,
    @UploadedFile() file: Express.Multer.File,
    @Req() { user: { sub } }: any
  ) {
    return this.merchantService.registerOwnerDetail(
      sub,
      registerOwnerDetailDTO
    );
  }

  @UseGuards(AuthGuard)
  @Post("/register/storeDetail")
  @UseInterceptors(FileInterceptor("storeImage"))
  @ApiBody({
    description: "Store Detail",
    type: RegisterStoreDetailDTO,
  })
  @ApiOperation({ summary: "Register Store Detail " })
  @HttpCode(HttpStatus.CREATED)
  registerStoreDetail(
    @Body() registerStoreDetailDTO: RegisterStoreDetailDTO,
    @Req() { user: { sub } }: any
  ) {
    return this.merchantService.registerStoreDetail(
      sub,
      registerStoreDetailDTO
    );
  }

  @UseGuards(AuthGuard)
  @Post("/register/storeTiming")
  @ApiOperation({ summary: "Register Store Timing Detail " })
  @HttpCode(HttpStatus.CREATED)
  registerStoreTiming(
    @Body() registerTime: RegisterTime,
    @Req() { user: { sub } }: any
  ) {
    return this.merchantService.registerStoreTiming(sub, registerTime);
  }

  @UseGuards(AuthGuard)
  @Post("/register/bankDetail")
  @ApiOperation({ summary: "Register Merchant's Account Detail " })
  @HttpCode(HttpStatus.CREATED)
  registerBankDetail(
    @Body() registerBankDetailDTO: RegisterBankDetailDTO,
    @Req() { user: { sub } }: any
  ) {
    return this.merchantService.registerBankDetail(sub, registerBankDetailDTO);
  }
  @UseGuards(AuthGuard)
  @Post("/register/documents")
  @UseInterceptors(FilesInterceptor("files"))
  @ApiOperation({ summary: "Register Merchant's Documents" })
  @HttpCode(HttpStatus.CREATED)
  registerDocuments(
    @Body() registerDocumentDTO: RegisterDocumentDTO,
    @Req() { user: { sub } }: any
  ) {
    return this.merchantService.registerDocuments(sub,registerDocumentDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Get("step/:id")
  @ApiOperation({ summary: "Get current step by id" })
  @ApiParam({
    name: "id",
    description: "ID of the Merchnat",
    type: String,
  })
  getStepById(@Param("id") id: any) {
    return this.merchantService.getStepById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get("switchStore/:id")
  @ApiOperation({ summary: "Get current step by id" })
  accessMerchnatByAdmin(@Param("id") id: any) {
    return this.merchantService.accessMerchnatByAdmin(id);
  }
}
