import { Module } from "@nestjs/common";
import { AdminController } from "./controller/admin.controller";
import { AdminService } from "./service/admin.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../../constants/auth.constant";
import { MerchantController } from "./controller/merchant.controller";
import { MerchantService } from "./service/merchant.service";
import { S3Module } from "../s3/s3.module";
import { JWT_CONFIG } from "src/config/jwt.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>("JWT.SECRET"),
          signOptions: {
            expiresIn: configService.get<string | number>("JWT.EXPIRE_TIME"),
          },
        };
      },
      global: true,
    }),
    S3Module,
  ],
  controllers: [AdminController, MerchantController],
  providers: [AdminService, MerchantService],
})
export class AuthModule {}
