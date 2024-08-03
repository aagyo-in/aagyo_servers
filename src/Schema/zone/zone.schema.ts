import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";

@Schema({ timestamps: true })
export class Zone {
  @Prop({ required: true })
  zone: string;

  @Prop({ required: true })
  zoneId: string;

  @Prop()
  isActive: boolean = false;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  mapPath: [];
}

export type ZoneDocument = Zone & Document;

export const ZoneSchema = SchemaFactory.createForClass(Zone);

export const ZONE_MODEL = Zone.name;
