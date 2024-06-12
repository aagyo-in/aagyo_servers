import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Status {
  ON = "ON",
  INACTIVE = "INACTIVE",
  OFF = "OFF",
}

@Schema({ timestamps: true })
export class ShippingCharge {
  @Prop({ required: true })
  zone: string;

  @Prop({ required: true })
  operatingZone: string;

  @Prop({ required: true })
  radius: number;

  @Prop({ required: true })
  option: string;

  @Prop({ required: true })
  minimumAmount: number;

  @Prop({ required: true })
  shippingFee: number;

  @Prop({ required: true })
  minOrderNA: boolean;

  @Prop({ required: true })
  adddShippingFeeGTMO: boolean;

  @Prop({ required: true })
  note: string;
}

export type ShippingChargeDocument = ShippingCharge & Document;

export const ShippingChargeSchema =
  SchemaFactory.createForClass(ShippingCharge);

export const SHIPPINGCHARGE_MODEL = ShippingCharge.name;
