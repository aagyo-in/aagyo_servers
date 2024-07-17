import { Injectable } from "@nestjs/common";
import { AddCartDto } from "./dto/add-cart.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { InjectModel } from "@nestjs/mongoose";
import { CART_MODEL, CartDocument } from "src/Schema/cart";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { UpdateCartDTO } from "./dto/update-cart.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CART_MODEL)
    private readonly cartModel: Model<CartDocument>
  ) {}

  async addToCart(userId: any, addCartDto: AddCartDto) {
    const { productId, quantity, varientId } = addCartDto;
    try {
      await this.cartModel.create({
        productId: new ObjectId(productId),
        userId: new ObjectId(userId),
        varientId: new ObjectId(varientId),
        quantity,
      });
      return {
        message: "Item add to Cart Successfully!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  async getCart(userId: any) {
    try {
      console.log(userId);
      const aggregatePipeline: any = [
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $addFields: {
            productVarient: {
              $filter: {
                input: "$product.varients",
                as: "varient",
                cond: { $eq: ["$$varient._id", "$varientId"] },
              },
            },
          },
        },
        {
          $unwind: "$productVarient",
        },
        {
          $project: {
            quantity: 1,
            createdAt: 1,
            product: {
              _id: "$product._id",
              productName: "$product.productName",
              description: "$product.description",
              isOrganic: "$product.isOrganic",
              mrp: "$productVarient.mrp",
              price: "$productVarient.price",
              productImage: {
                $arrayElemAt: ["$productVarient.productImage", 0],
              },
              weigthOrCount: "$productVarient.weigthOrCount",
              purchaseQuantity: "$productVarient.purchaseQuantity",
            },
          },
        },
      ];

      const data = await this.cartModel.aggregate(aggregatePipeline).exec();

      const billSummary = {
        itemTotal: data
          ?.map((item) => item.product.price * item?.quantity)
          .reduce((acc, red) => acc + red, 0),
        handlingCharge: 10,
        deliveryCharge: 20,
      };
      return {
        message: "Cart of user!",
        status: true,
        data: {
          products: data,
          billSummary,
        },
      };
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  async deleteFromCart(userId: any, id: any) {
    try {
      await this.cartModel.deleteOne({ _id: new ObjectId(id) });
      return {
        message: "Delete Product from  Cart!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  async updateCartItem(userId: any, id: any, updateCartDTO: UpdateCartDTO) {
    try {
      const { quantity } = updateCartDTO;

      await this.cartModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: { quantity },
        }
      );
      return {
        message: "Update Product from Cart!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }
}
