import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class ReferAndEarn {
  @Prop({ required: true })
  zone: string;

  @Prop({ required: true })
  category: string;
  @Prop({ required: true })
  couponType: string;
  @Prop({ required: true })
  merchant: string;
  @Prop({ required: true })
  discountOffer: string;
  @Prop({ required: true })
  daysValidity: number;
  @Prop({ required: true })
  discount: number;
  @Prop({ required: true })
  discountUpto: number;
  @Prop({ required: true })
  minOrderAmount: number;
  @Prop({ required: true })
  notificationText: string;
  @Prop({ required: true })
  status: boolean;
}

export type ReferAndEarnDocument = ReferAndEarn & Document;

export const ReferAndEarnSchema = SchemaFactory.createForClass(ReferAndEarn);

export const REFERANDEARN_MODEL = ReferAndEarn.name;
