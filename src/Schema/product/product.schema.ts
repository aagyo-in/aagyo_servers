import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import mongoose, { Document } from "mongoose";

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  productOwner: ObjectId;

  @Prop({ required: true, ref: "Category" })
  categoryId: mongoose.Types.ObjectId;

  @Prop({ ref: "Unit" })
  unitId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  maxPurchaseQuantity: number;
  @Prop()
  isOrganic: boolean;

  @Prop()
  discountType: string;

  @Prop()
  totalStock: string;

  @Prop()
  discount: number;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ type: [String], required: true })
  keywords: string[];

  @Prop({ type: [], required: true })
  varients: any[];
  @Prop({ type: [], required: true })
  attributes: any[];

  @Prop({ type: Object, required: true })
  productImage: Object;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);

export const PRODUCTMODEL = Product.name;
