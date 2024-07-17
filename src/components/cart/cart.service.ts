import { Injectable } from "@nestjs/common";
import { AddCartDto } from "./dto/add-cart.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { InjectModel } from "@nestjs/mongoose";
import { CART_MODEL, CartDocument } from "src/Schema/cart";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CART_MODEL)
    private readonly cartModel: Model<CartDocument>
  ) {}

  async addToCart(userId: any, addCartDto: AddCartDto) {
    const { productId, quantity, varientId } = addCartDto;
    try {
      await this.cartModel.updateOne(
        { userId: userId },
        {
          $set: {
            userId: new ObjectId(userId),
            products: {
              productId: new ObjectId(productId),
              varientId: new ObjectId(varientId),
              quantity,
            },
          },
        },
        { upsert: true }
      );
      return {
        message: "Add to Cart Successfully!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  async getCart(userId: any) {
    try {
      const data = await this.cartModel.find({ userId: new ObjectId(userId) });
      return {
        message: "Cart of user!",
        status: true,
        data: data,
      };
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  async deleteFromCart(userId: any, id: any) {
    try {
      const data = await this.cartModel.find({ userId: new ObjectId(userId) });
      // const allProducts = data?.products.filter((item))
      return {
        message: "Delete Product from  Cart!",
        status: true,
        data: data,
      };
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }
}
