import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class DiscountOffer {
  @Prop({ required: true })
  merchant: [string];

  @Prop({ required: true })
  couponType: string;

  @Prop({ required: true })
  couponSponsored: string;

  @Prop({ required: true })
  offerName: string;

  @Prop({ required: true })
  couponCode: string;

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true })
  discountedAmountUpto: number;

  @Prop({ required: true })
  minimumOrderAmount: number;

  @Prop({ required: true })
  usagePerCustomer: number;

  @Prop({ required: true })
  dateFrom: string;

  @Prop({ required: true })
  dateTo: string;

  @Prop({ required: true })
  orderFacility: string = "Both";

  @Prop({ required: true })
  paymentMethod: string = "Both";

  @Prop()
  termAndCond: string;

  @Prop()
  offerDesc: string;

  @Prop()
  banner: string;

  @Prop({ default: 0 })
  useCoupon: number = 0;

  @Prop({ default: 0 })
  totalSale: number = 0;
}

export type DiscountOfferDocument = DiscountOffer & Document;

export const DiscountOfferSchema = SchemaFactory.createForClass(DiscountOffer);

export const DISCOUNTOFFER_MODEL = DiscountOffer.name;
