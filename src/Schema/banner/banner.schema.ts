import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({ timestamps: true })
export class Banner {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "stores", required: true })
  storeId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "categories" })
  categoryId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "products" })
  productId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Date })
  timeFrom: Date;

  @Prop({ type: Date })
  timeTo: Date;

  @Prop({ type: Array })
  files: [
    {
      fileName: string;
      filePath: string;
    },
  ];

  @Prop({ type: Boolean })
  isSponsor: boolean = false;

  @Prop({ type: Boolean })
  isInStore: boolean = false;

  @Prop({ type: Boolean, default: true })
  isActive: boolean = true;
}

export type BannerDocument = Banner & Document;

export const BannerSchema = SchemaFactory.createForClass(Banner);

export const BANNER_MODEL = Banner.name;
