import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import {
  TRANSACTIONFILTER,
  TransactionDTO,
} from "../dto/merchant/transaction.dto";
import { generateUniqueNumber } from "src/utils/helper";
import { SettledPaymentDTO } from "../dto/merchant/settled.dto";

@Injectable()
export class MerchantWalletService {
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
  }

  async getPaymentHistory(id: ObjectId): Promise<any> {
    const data = {
      todayEarning: {
        date: new Date(),
        amount: 15000.0,
      },
      upcomingPayment: {
        date: new Date(),
        amount: 7000.0,
      },
      settledPayment: {
        date: new Date(),
        amount: 1600.0,
      },
    };
    return {
      message: "Payment History!",
      status: "SUCCESS",
      data: data,
    };
  }

  async getSettledAmount(
    settledPaymentDTO: SettledPaymentDTO,
    id: ObjectId
  ): Promise<any> {
    const { limit, page } = settledPaymentDTO;
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
          utrNo: "13545626846489",
          dateFrom: new Date(),
          dateTo: new Date(),
          amount: 5537.0,
          details: {
            totalOrders: 56.0,
            recieveAmount: 108.0,
            orderAmount: 757.0,
            tax: 9.0,
            deliveryCharge: 657.0,
            extraCharge: 78.0,
            convenientFee: 88.0,
            commission: 47.0,
          },
        },
        {
          utrNo: "13545626876480",
          dateFrom: new Date(),
          dateTo: new Date(),
          amount: 54737.0,
          details: {
            totalOrders: 56.0,
            recieveAmount: 108.0,
            orderAmount: 757.0,
            tax: 9.0,
            deliveryCharge: 657.0,
            extraCharge: 78.0,
            convenientFee: 88.0,
            commission: 47.0,
          },
        },
        {
          utrNo: "135456268464808",
          dateFrom: new Date(),
          dateTo: new Date(),
          amount: 1737.0,
          details: {
            totalOrders: 56.0,
            recieveAmount: 108.0,
            orderAmount: 757.0,
            tax: 9.0,
            deliveryCharge: 657.0,
            extraCharge: 78.0,
            convenientFee: 88.0,
            commission: 47.0,
          },
        },
      ],
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
