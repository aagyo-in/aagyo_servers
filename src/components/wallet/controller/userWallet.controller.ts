import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { MerchantWalletService } from "../service/merchantWallet.service";
import { AuthGuard } from "src/guards/auth.guards";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { TransactionDTO } from "../dto/merchant/transaction.dto";

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags("Wallet for User")
@Controller("userWallet")
export class UserWallletController {
  constructor(private readonly merchantWalletService: MerchantWalletService) {}

  @Get("history")
  @ApiOperation({ summary: "Get Wallet History" })
  @ApiQuery({ name: "filter" ,required:false})
  @ApiQuery({ name: "page" })
  @ApiQuery({ name: "limit" })
  @HttpCode(HttpStatus.OK)
  getTransactionHistory(
    @Req() { user: { sub } }: any,
    @Query() transactionDTO: TransactionDTO
  ): any {
    return this.merchantWalletService.getTransactionHistory(
      sub,
      transactionDTO
    );
  }
}
