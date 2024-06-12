import { Module } from "@nestjs/common";
import { MerchantWallletController } from "./controller/merchantWallet.controller";
import { MerchantWalletService } from "./service/merchantWallet.service";

@Module({
  imports: [],
  controllers: [MerchantWallletController],
  providers: [MerchantWalletService],
})
export class WalletModule {}
