import { Module } from "@nestjs/common";
import { MerchantWallletController } from "./controller/merchantWallet.controller";
import { MerchantWalletService } from "./service/merchantWallet.service";
import { UserWallletController } from "./controller/userWallet.controller";
import { UserWalletService } from "./service/userWallet.service";

@Module({
  imports: [],
  controllers: [MerchantWallletController, UserWallletController],
  providers: [MerchantWalletService, UserWalletService],
})
export class WalletModule {}
