import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { TransactionDTO, TRANSACTIONFILTER } from "./dto/get-transaction.dto";

@Injectable()
export class TransactionService {
  async usersTransaction(userId: any, transactionDTO: TransactionDTO) {
    const { filter, limit, page } = transactionDTO;
    try {
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
                orderId: "0000001",
                dateAndTime: new Date(),
                amount: +100.0,
                status: TRANSACTIONFILTER.DELIVERED,
                closingBalance: 267.0,
                chargeDetails: {
                  recievedAmount: 95,
                  orderAmount: 126,
                  tax: 14,
                  deliveryCharge: 55,
                  extraCharge: 56,
                  convenientFee: 78,
                  commision: 13,
                },
              },
              {
                orderId: "0000002",
                dateAndTime: new Date(),
                amount: +100.0,
                status: TRANSACTIONFILTER.CANCEL,
                closingBalance: 267.0,
                chargeDetails: {
                  recievedAmount: 65,
                  orderAmount: 146,
                  tax: 14,
                  deliveryCharge: 25,
                  extraCharge: 56,
                  convenientFee: 78,
                  commision: 13,
                },
              },
            ],
          },
          {
            date: new Date(),
            data: [
              {
                orderId: "0000003",
                dateAndTime: new Date(),
                amount: +100.0,
                status: TRANSACTIONFILTER.REJECTED,
                closingBalance: 267.0,
                chargeDetails: {
                  recievedAmount: 95,
                  orderAmount: 126,
                  tax: 14,
                  deliveryCharge: 55,
                  extraCharge: 56,
                  convenientFee: 78,
                  commision: 13,
                },
              },
              {
                orderId: "0000004",
                dateAndTime: new Date(),
                amount: +100.0,
                status: TRANSACTIONFILTER.REJECTED,
                closingBalance: 267.0,
                chargeDetails: {
                  recievedAmount: 65,
                  orderAmount: 146,
                  tax: 14,
                  deliveryCharge: 25,
                  extraCharge: 56,
                  convenientFee: 78,
                  commision: 13,
                },
              },
              {
                orderId: "0000005",
                dateAndTime: new Date(),
                amount: +100.0,
                status: TRANSACTIONFILTER.REJECTED,
                closingBalance: 267.0,
                chargeDetails: {
                  recievedAmount: 95,
                  orderAmount: 146,
                  tax: 14,
                  deliveryCharge: 25,
                  extraCharge: 56,
                  convenientFee: 68,
                  commision: 13,
                },
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
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
}
