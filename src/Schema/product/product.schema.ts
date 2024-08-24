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
  totalStock: number;

  @Prop()
  sort: number = 1;

  @Prop()
  weigthOrCount: string;

  @Prop()
  purchaseQuantity: number;
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  productOwner: ObjectId;

  @Prop({ required: true })
  masterCategory: string = "";

  @Prop({ required: true, ref: "Category" })
  categoryId: mongoose.Types.ObjectId[];

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Array, required: true })
  productImage: [];

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ type: [String], required: true })
  keywords: string[];

  @Prop()
  isOrganic: boolean;

  @Prop({ type: [Varients] })
  varients: Varients[];

  @Prop()
  sort: number = 1;

  @Prop({ type: Boolean, default: true })
  isActive: boolean = true;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);

export const PRODUCTMODEL = Product.name;
