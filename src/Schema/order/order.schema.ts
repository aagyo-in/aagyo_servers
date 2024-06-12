import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { Document } from "mongoose";

enum ORDERSTATUS {
  DUE = "DUE",
  PROCESSING = "PROCESSING",
  READYTOPICK = "READY TO PICK",
  ONTHEWAY = "ON THE WAY",
  DELIVERED = "DELIVERED",
  REJECTED = "REJECTED",
  CANCEL = "CANCEL",
  DENY = "DENY",
}

enum PAYMENTTYPE {
  COD = "Cash On Delivery",
  ONLINE = "Online",
  WALLET = "Wallet",
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  orderId: String;

  @Prop()
  instructions: String;

  @Prop({ default: "20 mins" })
  preprationTime: String;

  @Prop({ required: true })
  products: [ObjectId];

  @Prop({ required: true })
  user: ObjectId;

  @Prop({ required: true })
  address: ObjectId;

  @Prop({ required: true, default: 0 })
  totalAmount: number;

  @Prop({ required: true, default: 0 })
  paymentType: PAYMENTTYPE;

  @Prop({ required: true, enum: ORDERSTATUS, default: ORDERSTATUS.DUE })
  orderStatus: string;
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);

export const ORDERMODEL = Order.name;
