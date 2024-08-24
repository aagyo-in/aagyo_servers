import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";

@Schema({ timestamps: true, strict: true })
export class MasterCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Admin" })
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Object, required: true })
  image: {
    file: string;
    url: string;
  };

  @Prop({ type: Boolean, default: false })
  status: boolean;

  @Prop({ type: Number, default: 1 })
  sort: number;

  @Prop()
  instructions: [string];
}

export type MasterCategoryDocument = MasterCategory & Document;

export const MasterCategorySchema = SchemaFactory.createForClass(MasterCategory);

export const MASTER_CATEGORY_MODEL = MasterCategory.name;
