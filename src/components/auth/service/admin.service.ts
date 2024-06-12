import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AdminLoginDTO } from "../dto/adminLogin.dto";
import { CrudService } from "src/base/crud.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { ADMIN_MODEL, AdminDocument } from "src/Schema/admin";
import { SIGNIN, USERNOTEXIST, WRONGPASSWORD } from "src/utils/messages";
import { AdminSignupDTO } from "../dto/admin-Signup.dto";
import { ForgotPasswordDTO } from "../dto/admin-forgot.dto";
import { ResetPasswordDTO } from "../dto/reset-forgot.dto";

@Injectable()
export class AdminService extends CrudService {
  constructor(
    @InjectModel(ADMIN_MODEL)
    private readonly adminModel: Model<AdminDocument>,
    private jwtService: JwtService
  ) {
    super(adminModel);
  }

  async signInAccount(adminLoginDTO: AdminLoginDTO) {
    try {
      const { email, password } = adminLoginDTO;
      const user = await this.adminModel.findOne({ email });
      if (!user) {
        throw new BadRequestException(USERNOTEXIST);
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        throw new UnauthorizedException(WRONGPASSWORD);
      }

      const payload = {
        sub: user._id,
        userName: user.name,
        userEmail: user.email,
      };

      const access_token = await this.jwtService.signAsync(payload);

      return {
        status: "ACCOUNT_LOGIN_SUCESSFULLY",
        access_token,
        message: SIGNIN,
      };
    } catch (err) {
      console.log(err);
      throw new ForbiddenException(err);
    }
  }

  async signUpAccount(adminSignupDTO: AdminSignupDTO): Promise<any> {
    try {
      const { email, name, password } = adminSignupDTO;
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      const result = await this.adminModel.create({
        email,
        name,
        password: hashedPassword,
      });
      return {
        message: "Account Signup Successfully!",
        STATUS: "SUCCESS",
      };
    } catch (error) {
      console.error(error);
      throw new ForbiddenException(error);
    }
  }

  async forgotPassword(forgotPasswordDTO: ForgotPasswordDTO): Promise<any> {
    try {
      const { email } = forgotPasswordDTO;
      const user = await this.adminModel.findOne({ email });
      if (!user) {
        throw new BadRequestException(USERNOTEXIST);
      }

      const payload = {
        sub: user._id,
        userName: user.name,
        userEmail: user.email,
      };

      const access_token = await this.jwtService.signAsync(payload);
      return {
        message: "Password Forgot Successfully!",
        status: "SUCCESS",
        link: `${process.env.DOMAIN}/reset_password?token=${access_token}`,
      };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async resetPassword(
    resetPasswordDTO: ResetPasswordDTO,
    token: string
  ): Promise<any> {
    try {
      const { password } = resetPasswordDTO;
      const payload = this.jwtService.verify(token);

      console.log("token", token);
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);

      const user = await this.adminModel.findOneAndUpdate(
        { email: payload?.userEmail },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
      console.log(user);
      return {
        message: "Password Updated Successfully!",
        status: "SUCCESS",
      };
    } catch (error) {
      throw new ForbiddenException("Invalid or Expired Token");
    }
  }
}
