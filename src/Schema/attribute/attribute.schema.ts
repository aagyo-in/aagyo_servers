import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";

@Schema({ timestamps: true })
export class Attribute {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, ref: "merchants" })
  createdBy: mongoose.Types.ObjectId;
}

export type AttributeDocument = Attribute & Document;

export const AttributeSchema = SchemaFactory.createForClass(Attribute);

export const ATTRIBUTE_MODEL = Attribute.name;
