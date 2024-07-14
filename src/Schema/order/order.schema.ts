import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import mongoose, { Document } from "mongoose";

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

enum DELIVERY_INSTRUCTION {
  AVOID_CALL = "AVOID_CALL",
  DONT_BELL = "DONT_BELL",
  LEAVE_AT_DOOR = "LEAVE_AT_DOOR",
  LEAVE_WITH_GAURD = "LEAVE_WITH_GAURD",
  PET_AT_HOME = "PET_AT_HOME",
}
enum ORDERTYPE {
  AAGYODELIVERY = "AAGYODELIVERY",
  SELFDELIVERY = "SELFDELIVERY",
  PICKUP = "PICKUP",
}

@Schema({ timestamps: false })
class Product {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  })
  productId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Number, default: 1 })
  productQuantity: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "users", required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  products: Product[];

  @Prop()
  instructions: String;

  @Prop({ type: Number })
  handlingCharge: Number;

  @Prop({ type: Number })
  deliveryCharge: Number;

  @Prop({})
  totalPrice: Number;

  @Prop({
    ref: "coupons",
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  })
  couponId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: false })
  partnerTip: Number;

  @Prop({ required: false, enum: DELIVERY_INSTRUCTION })
  deliveryInstruction: DELIVERY_INSTRUCTION;

  @Prop({ default: "20 mins" })
  preprationTime: String;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  addressId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, default: 0 })
  paymentType: PAYMENTTYPE;

  @Prop({ required: true, enum: ORDERSTATUS, default: ORDERSTATUS.DUE })
  orderStatus: ORDERSTATUS;

  @Prop({ required: true, enum: ORDERTYPE, default: ORDERTYPE.AAGYODELIVERY })
  orderType: ORDERTYPE;
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);

export const ORDERMODEL = Order.name;
