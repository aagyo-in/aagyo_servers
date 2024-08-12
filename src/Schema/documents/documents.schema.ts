import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class Documents {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Merchant" })
  merchant_id: mongoose.Schema.Types.ObjectId;

  @Prop({})
  documents: [];
}

export type DocumentDetailDocument = Documents & Document;
export const DocumentDetailSchema = SchemaFactory.createForClass(Documents);
export const DOCUMENTDETAIL_MODEL = Documents.name;
