import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { TransactionDTO } from "../dto/merchant/transaction.dto";
import { generateUniqueNumber } from "src/utils/helper";

@Injectable()
export class MerchantWalletService {
  async getTransactionHistory(
    id: ObjectId,
    transactionDTO: TransactionDTO
  ): Promise<any> {
    const { filter, limit, page, search } = transactionDTO;
    const data = {
      metadata: [
        {
          total: 5,
          page: page,
          maxPage: 1,
        },
      ],
      data: [
        {
          dateAndTime: new Date(),
          amount: +100,
          closingBalance: 267.0,
        },
        {
          dateAndTime: new Date(),
          amount: -56,
          closingBalance: 177.0,
          paidOrderNo: "76799",
        },
        {
          dateAndTime: new Date(),
          amount: +78,
          closingBalance: 567.0,
        },
      ],
    };
    return {
      message: "Transaction History!",
      status: "SUCCESS",
      data: data,
    };
  }

  async getPaymentHistory(id: ObjectId): Promise<any> {
    const data = {
      todayEarning: 20000.0,
      upcomingPayment: 1200.0,
      settledAmount: 767.0,
    };
    return {
      message: "Payment History!",
      status: "SUCCESS",
      data: data,
    };
  }

  async requestForWithdrwals(id: ObjectId): Promise<any> {
    const data = {
      ticketNumber: generateUniqueNumber(),
      dateAndTime: new Date(),
    };
    return {
      message: "Request For Emergency withdraw has been successfully noted!",
      status: "SUCCESS",
      data: data,
    };
  }
}
