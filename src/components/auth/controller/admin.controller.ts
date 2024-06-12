import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from "@nestjs/common";
import { AdminService } from "../service/admin.service";
import { AdminLoginDTO } from "../dto/adminLogin.dto";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { AdminSignupDTO } from "../dto/admin-Signup.dto";
import { ForgotPasswordDTO } from "../dto/admin-forgot.dto";
import { ResetPasswordDTO } from "../dto/reset-forgot.dto";

@ApiTags("admin")
@Controller("/admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Login Admin" })
  @HttpCode(HttpStatus.OK)
  @Post("/signIn")
  @ApiBody({ type: AdminLoginDTO })
  signInAccount(
    @Body() adminLoginDTO: AdminLoginDTO
  ): Promise<{ message: string }> {
    return this.adminService.signInAccount(adminLoginDTO);
  }

  @ApiOperation({ summary: "Signup Admin Account" })
  @HttpCode(HttpStatus.OK)
  @Post("/signUp")
  @ApiBody({ type: AdminSignupDTO })
  signUpAccount(
    @Body() adminSignupDTO: AdminSignupDTO
  ): Promise<{ message: string }> {
    return this.adminService.signUpAccount(adminSignupDTO);
  }

  @ApiOperation({ summary: "Forgot Admin Password" })
  @HttpCode(HttpStatus.OK)
  @Post("/forgot-password")
  @ApiBody({ type: ForgotPasswordDTO })
  forgotPassword(
    @Body() forgotPasswordDTO: ForgotPasswordDTO
  ): Promise<{ message: string }> {
    return this.adminService.forgotPassword(forgotPasswordDTO);
  }

  @ApiOperation({ summary: "Reset Admin Password" })
  @HttpCode(HttpStatus.OK)
  @Post("/reset-password")
  @ApiQuery({ name: "token" })
  @ApiBody({ type: ResetPasswordDTO })
  resetPassword(
    @Body() resetPasswordDTO: ResetPasswordDTO,
    @Query("token") token: string
  ) {
    return this.adminService.resetPassword(resetPasswordDTO, token);
  }
}
