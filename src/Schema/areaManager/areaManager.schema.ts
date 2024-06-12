import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";

@Schema({ timestamps: true })
export class AreaManager {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, type: [] })
  authority: [string];

  @Prop({ required: true })
  operatingZone: string;

  @Prop({ default: "Area Manager" })
  role: string;
}

export type AreaManagerDocument = AreaManager & Document;

export const AreaManagerSchema = SchemaFactory.createForClass(AreaManager);

export const AREAMANAGER_MODEL = AreaManager.name;
