import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({ timestamps: true })
export class BankDetail {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Merchant" })
  merchant_id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true })
  accountType: string;

  @Prop({ required: true })
  accountHolderName: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  mobile: string;
}

export type BankDetailDocument = BankDetail & Document;

export const BankDetailSchema = SchemaFactory.createForClass(BankDetail);

export const BANKDETAIL_MODEL = BankDetail.name;
