import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";

@Schema({ timestamps: true })
export class Merchant {
  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  gender: string;
}

export type MerchantDocument = Merchant & Document;

export const MerchantSchema = SchemaFactory.createForClass(Merchant);

export const MERCHANT_MODEL = Merchant.name;
