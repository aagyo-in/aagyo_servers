import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import {
  TRANSACTIONFILTER,
  TransactionDTO,
} from "../dto/merchant/transaction.dto";

@Injectable()
export class UserWalletService {
  async getTransactionHistory(
    id: ObjectId,
    transactionDTO: TransactionDTO
  ): Promise<any> {
    const { filter, limit, page } = transactionDTO;
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
          transactionId: "CASH000001",
          dateAndTime: new Date(),
          amount: 700,
          transactionType: TRANSACTIONFILTER.CASHBACK,
        },
        {
          transactionId: "CASH000001",
          dateAndTime: new Date(),
          amount: 40,
          transactionType: TRANSACTIONFILTER.PURCHASE,
        },
        {
          transactionId: "CASH000001",
          dateAndTime: new Date(),
          amount: 200,
          transactionType: TRANSACTIONFILTER.PURCHASE,
        },
        {
          transactionId: "CASH000001",
          dateAndTime: new Date(),
          amount: 700,
          transactionType: TRANSACTIONFILTER.CASHBACK,
        },
      ],
    };
    return {
      message: "Transaction History of Wallet!",
      status: "SUCCESS",
      data: data,
    };
  }
}
