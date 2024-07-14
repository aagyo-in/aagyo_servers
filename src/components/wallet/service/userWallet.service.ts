import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import {
  TRANSACTIONFILTER,
  TransactionDTO,
} from "../dto/user/get-walletHistory.dto";

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
          date: new Date(),
          data: [
            {
              transactionId: "0000001",
              dateAndTime: new Date(),
              amount: 100.0,
              status: TRANSACTIONFILTER.CASHBACK,
            },
            {
              transactionId: "0000002",
              dateAndTime: new Date(),
              amount: 500.0,
              status: TRANSACTIONFILTER.PURCHASE,
            },
            {
              transactionId: "0000003",
              dateAndTime: new Date(),
              amount: 100.0,
              status: TRANSACTIONFILTER.PURCHASE,
            },
            {
              transactionId: "0000004",
              dateAndTime: new Date(),
              amount: 100.0,
              status: TRANSACTIONFILTER.CASHBACK,
            },
          ],
        },
      ],
    };
    return {
      message: "Transaction History!",
      status: "SUCCESS",
      data: data,
    };
  }
}
