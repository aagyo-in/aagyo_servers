import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "../service/user.service";
import { MerchantLoginDTO } from "../dto/merchantLogin.dto";
import { VerifyOTPDTO } from "../dto/verifyOTP.dto";
import { userProfileDTO } from "../dto/user/user-profile.dto";

@ApiTags("Authantication User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signIn")
  @ApiOperation({ summary: "SignIn Account (for send an OTP)" })
  signInAccountByPhone(
    @Body() userLoginDto: MerchantLoginDTO
  ): Promise<{ message: string }> {
    return this.userService.signInAccountByPhone(userLoginDto);
  }

  @Post("/user-profile")
  @ApiOperation({ summary: "Saved User's Detail " })
  savedUserProfile(
    @Body() userProfileDTO: userProfileDTO
  ): Promise<{ message: string }> {
    return this.userService.savedUserProfile(userProfileDTO);
  }

  @Post("/verifyOTP")
  @ApiOperation({ summary: "VerifyOtp" })
  verifyOTP(@Body() verifyOtpDto: VerifyOTPDTO): Promise<{ message: string }> {
    return this.userService.verifyOTP(verifyOtpDto);
  }
}
