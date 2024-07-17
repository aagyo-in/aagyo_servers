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

  async chartOfWallet(id: ObjectId): Promise<any> {
    const data = {
      totalAmount: 30000,
      reportOfSevenDays: {
        1: 30000.0,
        2: 30000.0,
        3: 60000.0,
        4: 70000.0,
        5: 10000.0,
        6: 5000.0,
        7: 30000.0,
      },
      dailyAvgAmount: 3568.0,
      dailyAvgOrders: 36.0,
      ticketSize: 134.0,
    };
    return {
      message: "Report for Charts",
      status: "SUCCESS",
      data: data,
    };
  }
}
