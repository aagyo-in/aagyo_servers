import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";

@Schema({ timestamps: true })
export class Merchant {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, lowercase: true })
  email: string;

  @Prop({ type: String })
  contact: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: Number })
  rating: number = 4;
}

export type MerchantDocument = Merchant & Document;

export const MerchantSchema = SchemaFactory.createForClass(Merchant);

export const MERCHANT_MODEL = Merchant.name;
