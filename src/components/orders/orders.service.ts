import { Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { ORDERMODEL, OrderDocument } from "src/Schema/order";
import { CrudService } from "src/base/crud.service";
import { UpdateOrderStatusDTO } from "./dto/update-status.dto";
import { OrderHistoryDTO } from "./dto/order-history.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";

@Injectable()
export class OrdersService extends CrudService {
  constructor(
    @InjectModel(ORDERMODEL)
    private readonly orderModel: Model<OrderDocument>
  ) {
    super(orderModel);
  }
  async createOrder(): Promise<any> {
    try {
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  async getDeliveredOrderDetails(id: ObjectId): Promise<any> {
    try {
      const data = {
        today: {
          totalPrice: 30000,
          totalOrders: 16,
        },
        week: {
          totalPrice: 30000,
          totalOrders: 16,
        },
        month: {
          totalPrice: 30000,
          totalOrders: 16,
        },
      };
      return {
        message: "Report Generate Successfully!",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  async getRejectedOrderDetails(id: ObjectId): Promise<any> {
    try {
      const data = {
        today: {
          totalPrice: 30000,
          totalOrders: 16,
        },
        week: {
          totalPrice: 30000,
          totalOrders: 16,
        },
        month: {
          totalPrice: 30000,
          totalOrders: 16,
        },
      };
      return {
        message: "Report Generate Successfully!",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }
  async getTopRatedOrders(id: ObjectId): Promise<any> {
    try {
      const data = [
        {
          product: "Dosa",
          revenue: "17%",
          menuItems: 160,
        },
        {
          product: "Bada Paav",
          revenue: "17%",
          menuItems: 160,
        },
        {
          product: "Imli",
          revenue: "17%",
          menuItems: 160,
        },
        {
          product: "Paneer",
          revenue: "15%",
          menuItems: 160,
        },
        {
          product: "Chola Chaat",
          revenue: "17%",
          menuItems: 160,
        },
      ];
      return {
        message: "Report Generate Successfully!",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  async getCurrentOrders(id: ObjectId): Promise<any> {
    try {
      const data = [
        {
          orderId: "20240001",
          dateAndTime: new Date(),
          user: "Suraj Yadav",
          totalOrderOfUser: 10,
          products: [],
          totalAmount: 3000,
          instruction: "More Spicy!",
          paymentStatus: "COD",
          orderStatus: "DUE",
          orderStatusCode: 0,
        },
      ];
      return {
        message: "Current Orders!",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  async updateStatus(
    id: ObjectId,
    updateOrderStatusDTO: UpdateOrderStatusDTO
  ): Promise<any> {
    try {
      const data = [
        {
          orderId: "20240001",
          dateAndTime: new Date(),
          user: "Suraj Yadav",
          totalOrderOfUser: 10,
          products: [],
          totalAmount: 3000,
          instruction: "More Spicy!",
          paymentStatus: "COD",
          orderStatus: "DUE",
          orderStatusCode: 0,
        },
      ];
      return {
        message: "Status Update Successfully!",
        status: "SUCCESS",
        // data: data,
      };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  async orderHistory(
    id: ObjectId,
    orderHistoryDto: OrderHistoryDTO
  ): Promise<any> {
    try {
      const { day, limit, orderStatus, orderType, page, search } =
        orderHistoryDto;
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
            status: orderStatus,
            rating: 3.0,
            dateAndTime: new Date(),
            totalOrderByUser: 16,
            orders: [
              {
                productName: "Masala Dosa",
                quantity: 2,
              },
              {
                productName: "Paneer Pakoda",
                quantity: 1,
              },
              {
                productName: "Cold Drink",
                quantity: 1,
              },
            ],
            totalPrice: 589.0,
          },
          {
            status: orderStatus,
            rating: 5.0,
            dateAndTime: new Date(),
            totalOrderByUser: 16,
            orders: [
              {
                productName: "Masala Dosa",
                quantity: 2,
              },
              {
                productName: "Paneer Pakoda",
                quantity: 1,
              },
              {
                productName: "Cold Drink",
                quantity: 1,
              },
            ],
            totalPrice: 256.0,
          },
        ],
      };
      return {
        message: "Order History",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }
}
