import {
  Controller,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Query,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guards";
import { TransactionDTO } from "./dto/get-transaction.dto";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags("Transaction History")
@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: "transaction history of User" })
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: "page", type: String, required: true })
  @ApiQuery({ name: "limit", type: String, required: true })
  @ApiQuery({ name: "filter", type: String, required: false })
  @Get("user")
  usersTransaction(
    @Req() { user: { sub } }: any,
    @Query() transactionDTO: TransactionDTO
  ) {
    return this.transactionService.usersTransaction(sub, transactionDTO);
  }
}
