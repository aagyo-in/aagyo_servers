import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import mongoose, { Document } from "mongoose";

class Slot {
  @Prop({ required: false })
  openTime: string;

  @Prop({ required: false })
  closeTime: string;

  @Prop({ required: false })
  openDays: string[];
}
@Schema({ timestamps: true })
export class Store {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    unique: true,
    required: true,
  })
  merchant_id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: false })
  storeName: string;

  @Prop({ required: true })
  category: mongoose.Types.ObjectId[];

  @Prop({ required: false })
  country: string;

  @Prop({ required: false })
  state: string;

  @Prop({ required: false })
  city: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: false })
  pinCode: string;

  @Prop({ required: false })
  latitude: string;

  @Prop({ required: false })
  longitude: string;

  @Prop({ type: Object, required: false })
  banner: Object;

  @Prop({ required: false })
  isFullTimeOpen: boolean;

  @Prop({ type: Slot })
  slots: Slot[];

  @Prop({ required: false })
  contact: string;

  @Prop({ type: Object })
  openStatus: {
    openStatus: boolean;
    autoOpenTime: Date;
  };
}

export type StoreDocument = Store & Document;

export const StoreSchema = SchemaFactory.createForClass(Store);

export const STORE_MODEL = Store.name;
