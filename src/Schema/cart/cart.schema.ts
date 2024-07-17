import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({ timestamps: true })
class Product {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "products" })
  productId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "products" })
  varientId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Number, default: 1, min: 1 })
  quantity: number;
}

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "users" })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [Product] })
  products: Product[];
}

export type CartDocument = Cart & Document;

export const CartSchema = SchemaFactory.createForClass(Cart);

export const CART_MODEL = Cart.name;
