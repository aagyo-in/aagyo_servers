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
import { SettledPaymentDTO } from "../dto/merchant/settled.dto";

@UseGuards(AuthGuard)
@ApiTags("Wallet for Merchant")
@Controller("merchantWallet")
export class MerchantWallletController {
  constructor(private readonly merchantWalletService: MerchantWalletService) {}

  @ApiBearerAuth()
  @Get("transactions")
  @ApiOperation({ summary: "Get Transactions History" })
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

  @ApiBearerAuth()
  @Get("paymentReport")
  @ApiOperation({ summary: "Get Payments Analytics for Dashboard" })
  @HttpCode(HttpStatus.OK)
  getPaymentHistory(@Req() { user: { sub } }: any): any {
    return this.merchantWalletService.getPaymentHistory(sub);
  }

  @ApiBearerAuth()
  @Get("settledPayment")
  @ApiOperation({ summary: "Get Settled Amount" })
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: "page",
    type: String,
    required: false,
    description: "how many page you required?",
  })
  @ApiQuery({
    name: "limit",
    type: String,
    required: false,
    description: "set Limit",
  })
  getSettledAmount(
    @Query() settledPaymentDTO: SettledPaymentDTO,
    @Req() { user: { sub } }: any
  ): any {
    return this.merchantWalletService.getSettledAmount(settledPaymentDTO, sub);
  }

  @ApiBearerAuth()
  @Get("requestForWithdraw")
  @ApiOperation({ summary: "Request for Emergency Withrawls" })
  @HttpCode(HttpStatus.OK)
  requestForWithdrwals(@Req() { user: { sub } }: any): any {
    return this.merchantWalletService.requestForWithdrwals(sub);
  }
}
