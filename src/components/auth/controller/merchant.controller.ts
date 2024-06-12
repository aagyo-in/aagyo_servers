import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
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
import { RegisterMerchantDTO } from "../dto/registerDTO/register.dto";
import mongoose, { ObjectId } from "mongoose";
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
import { IsObject, buildMessage } from "class-validator";
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

  @Post("/register/ownerDetail")
  @ApiOperation({ summary: "Register Owner Detail " })
  @HttpCode(HttpStatus.CREATED)
  registerOwnerDetail(
    @Body() registerOwnerDetailDTO: RegisterOwnerDetailDTO,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.merchantService.registerOwnerDetail(registerOwnerDetailDTO);
  }

  @Post("/register/storeDetail")
  @UseInterceptors(FileInterceptor("storeImage"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Store Detail",
    type: RegisterStoreDetailDTO,
  })
  @ApiOperation({ summary: "Register Store Detail " })
  @HttpCode(HttpStatus.CREATED)
  registerStoreDetail(
    @Body() registerStoreDetailDTO: RegisterStoreDetailDTO,
    @UploadedFile() // new ParseFilePipe({
    //   // validators: [
    storeImage //   //   new MaxFileSizeValidator({ maxSize: 100000000 }),
    //   //   new FileTypeValidator({
    //   //     fileType: /(image\/jpeg|image\/png|application\/pdf)/,
    //   //   }),
    //   // ],
    // })
    : Express.Multer.File
  ) {
    console.log("banner", storeImage);
    return this.merchantService.registerStoreDetail(
      registerStoreDetailDTO,
      storeImage
    );
  }

  @Post("/register/storeTiming")
  @ApiOperation({ summary: "Register Store Timing Detail " })
  @HttpCode(HttpStatus.CREATED)
  registerStoreTiming(@Body() registerTime: RegisterTime) {
    return this.merchantService.registerStoreTiming(registerTime);
  }

  @Post("/register/bankDetail")
  @ApiOperation({ summary: "Register Merchant's Account Detail " })
  @HttpCode(HttpStatus.CREATED)
  registerBankDetail(@Body() registerBankDetailDTO: RegisterBankDetailDTO) {
    return this.merchantService.registerBankDetail(registerBankDetailDTO);
  }

  @Post("/register/documents")
  @UseInterceptors(FilesInterceptor("files"))
  @ApiOperation({ summary: "Register Merchant's Documents" })
  @HttpCode(HttpStatus.CREATED)
  registerDocuments(
    @Body() registerDocumentDTO: RegisterDocumentDTO,
    @UploadedFiles(
      new ParseFilePipe({
        // validators: [
        //   new MaxFileSizeValidator({ maxSize: 100000000 }),
        //   new FileTypeValidator({
        //     fileType: /(image\/jpeg|image\/png|application\/pdf)/,
        //   }),
        // ],
      })
    )
    files: Array<Express.Multer.File>
  ) {
    return this.merchantService.registerDocuments(registerDocumentDTO, files);
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
