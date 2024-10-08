import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";

@Schema({ timestamps: true, strict: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Merchant" })
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Object, required: true })
  banner: object;

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: Boolean, default: false })
  createdByAdmin: boolean;

  @Prop({ type: Number, default: 1 })
  sort: number;
  
  @Prop()
  instructions: [string];
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);

export const CATEGORY_MODEL = Category.name;
