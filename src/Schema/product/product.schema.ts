import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import mongoose, { Document } from "mongoose";

@Schema()
class Varients {
  @Prop()
  discountType: string;

  @Prop()
  discount: number;

  @Prop()
  mrp: number;

  @Prop()
  price: number;

  @Prop()
  weigthOrCount: number;

  @Prop()
  totalStock: number;

  @Prop()
  purchaseQuantitiy: number;

  @Prop()
  short: string;

  @Prop({ type: Object, required: true })
  productImage: Object;
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  productOwner: ObjectId;

  @Prop({ required: true, ref: "Category" })
  categoryId: [mongoose.Types.ObjectId];

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ type: [String], required: true })
  keywords: string[];

  @Prop()
  isOrganic: boolean;

  @Prop({ type: [Varients] })
  varients: [Varients];
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);

export const PRODUCTMODEL = Product.name;
