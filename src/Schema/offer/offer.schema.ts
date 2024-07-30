import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsDate } from "class-validator";
import mongoose, { Date, Document } from "mongoose";

@Schema({ timestamps: true })
export class Offer {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "stores" })
  readonly storeId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  readonly discount: Number;

  @Prop()
  readonly amountUpto: Number;

  @Prop()
  readonly minimumAmount: Number;

  @Prop()
  readonly usagePerCustomer: Number;

  @Prop()
  readonly discountApplicableFor: String;

  @Prop()
  readonly selectMealTime: String;

  @Prop({ type: Date })
  @IsDate()
  @Type(() => Date)
  readonly dateFrom: Date;

  @Prop({ type: Date })
  @IsDate()
  @Type(() => Date)
  readonly dateTo: Date;

  @Prop()
  readonly paymentMethod: String;

  @Prop({ default: true })
  readonly isActive: Boolean = true;
}

export type OfferDocument = Offer & Document;

export const OfferSchema = SchemaFactory.createForClass(Offer);

export const OFFER_MODEL = Offer.name;
