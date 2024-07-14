import { BadRequestException, Injectable } from "@nestjs/common";
import { CrudService } from "src/base/crud.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { SENDOTP, SIGNIN, WRONGOTP } from "src/utils/messages";
import { MerchantLoginDTO } from "../dto/merchantLogin.dto";
import { VerifyOTPDTO } from "../dto/verifyOTP.dto";
import { createToken, generateOTP, validateOTP } from "src/utils/helper";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { InjectModel } from "@nestjs/mongoose";
import { USER_MODEL, UserDocument } from "src/Schema/user";
import { Model } from "mongoose";

@Injectable()
export class UserService extends CrudService {
  constructor(
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {
    super(userModel);
  }

  async signInAccountByPhone(userLoginDto: MerchantLoginDTO) {
    try {
      const { phoneNumber, countryCode, countryName } = userLoginDto;

      const OTP = generateOTP();
      const TOKEN = createToken(OTP);

      const isExistUser = await this.userModel.findOne({ phoneNumber });

      if (!isExistUser) {
        await this.userModel.create({
          phoneNumber,
          countryCode,
          countryName,
        });
      }

      return {
        status: "OTP_SEND_SUCESSFULLY",
        message: SENDOTP,
        OTP: OTP,
        OTP_TOKEN: TOKEN,
      };
    } catch (err) {
      throw new CustomHttpException(err.message);
    }
  }

  async verifyOTP(verifyOTPDTO: VerifyOTPDTO) {
    try {
      const { phoneNumber, countryCode, countryName, OTP_TOKEN, OTP } =
        verifyOTPDTO;

      const isValidOTP = validateOTP(OTP, OTP_TOKEN);

      if (!isValidOTP) {
        throw new BadRequestException(WRONGOTP);
      }

      const { _id } = await this.userModel.findOne({ phoneNumber });

      const payload = {
        sub: _id,
        userName: phoneNumber,
        userEmail: phoneNumber,
      };
      const access_token = await this.jwtService.signAsync(payload);
      return {
        statusCode: 1,
        status: "ACCOUNT_LOGIN_SUCCESSFULLY",
        access_token: access_token,
        id: "767gghuy78hjuy787juj",
        message: SIGNIN,
      };
    } catch (err) {
      throw new CustomHttpException(err.message);
    }
  }
}
