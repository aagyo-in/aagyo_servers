import { Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { ORDERMODEL, OrderDocument } from "src/Schema/order";
import { CrudService } from "src/base/crud.service";
import { UpdateOrderStatusDTO } from "./dto/update-status.dto";
import { OrderHistoryDTO } from "./dto/order-history.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { ObjectId } from "mongodb";
import { GetOrdersDTO } from "./dto/get-orders.dto";

@Injectable()
export class OrdersService extends CrudService {
  constructor(
    @InjectModel(ORDERMODEL)
    private readonly orderModel: Model<OrderDocument>
  ) {
    super(orderModel);
  }
  async createOrder(userId: any, createOrderDTO: CreateOrderDTO): Promise<any> {
    const {
      addressId,
      couponId,
      deliveryCharge,
      deliveryInstruction,
      handlingCharge,
      instructions,
      partnerTip,
      paymentMode,
      products,
      total,
    } = createOrderDTO;
    try {
      const order = await this.orderModel.create({
        userId: new ObjectId(userId),
        products: products?.map(({ productId, productQuantity }: any) => {
          productId: new ObjectId(productId);
          productQuantity: productQuantity;
        }),
        instructions,
        handlingCharge,
        deliveryCharge,
        totalPrice: total,
        couponId,
        partnerTip,
        deliveryInstruction,
        addressId,
        paymentType: paymentMode,
      });
      const data = {
        orderId: "AAG000001",
      };
      return {
        message: "Order Placed Successfully!",
        status: true,
        data: data,
      };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  async getAllOrderOfSpeciificUser(userId: any, getOrdersDTO: GetOrdersDTO) {
    const { day, limit, orderStatus, orderType, page } = getOrdersDTO;
    try {
      const aggregatePipeline: any = [
        {
          $match: {
            $and: [
              {
                userId: new ObjectId(userId),
              },
              {
                orderStatus: {
                  $regex: `${orderStatus || ""}`,
                  $options: "i",
                },
              },
              {
                orderType: {
                  $regex: `${orderType || ""}`,
                  $options: "i",
                },
              },
            ],
          },
        },
        {
          $facet: {
            metadata: [
              { $count: "total" },
              {
                $addFields: {
                  page: +page,
                  maxPage: {
                    $ceil: {
                      $divide: ["$total", +limit],
                    },
                  },
                },
              },
            ],
            data: [{ $skip: (+page - 1) * +limit }, { $limit: +limit }],
          },
        },
      ];
      const data = await this.orderModel.aggregate(aggregatePipeline);
      return {
        message: "Orders of a specific user",
        status: true,
        data,
      };
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  async getASpecificOrderById(userId: any, id: any) {
    try {
      const data = await this.orderModel.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw new CustomHttpException(error.message);
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
          products: [
            {
              productName: "Dosa",
              isOrganic: true,
              productImage:
                "https://aagyo-v1.s3.ap-south-1.amazonaws.com/productImage1717937017004",
              price: 150.0,
              quantity: 2,
            },
            {
              productName: "Burger",
              isOrganic: true,
              productImage:
                "https://aagyo-v1.s3.ap-south-1.amazonaws.com/productImage1717937017004",
              price: 10.0,
              quantity: 3,
            },
          ],
          totalAmount: 400,
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
    const { orderStatus } = updateOrderStatusDTO;
    try {
      const data = [
        {
          orderId: "20240001",
          dateAndTime: new Date(),
          user: "Suraj Yadav",
          totalOrderOfUser: 10,
          products: [
            {
              productName: "Dosa",
              isOrganic: true,
              productImage:
                "https://aagyo-v1.s3.ap-south-1.amazonaws.com/productImage1717937017004",
              price: 150.0,
              quantity: 2,
            },
            {
              productName: "Burger",
              isOrganic: false,
              productImage:
                "https://aagyo-v1.s3.ap-south-1.amazonaws.com/productImage1717937017004",
              price: 10.0,
              quantity: 3,
            },
          ],
          totalAmount: 400,
          instruction: "More Delicious!",
          paymentStatus: "COD",
          orderStatus: orderStatus,
        },
      ];
      return {
        message: "Status Update Successfully!",
        status: "SUCCESS",
        data: data,
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
