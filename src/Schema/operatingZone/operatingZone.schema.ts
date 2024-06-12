import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  Document } from "mongoose";

export enum Status {
  ON = "ON",
  INACTIVE = "INACTIVE",
  OFF = "OFF",
}

@Schema({ timestamps: true })
export class OperatingZone {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  lattitude: string;

  @Prop({ required: true })
  longitude: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: Object.values(Status), default: Status.ON })
  status: Status;
}

export type OperatingZoneDocument = OperatingZone & Document;

export const OperatingZoneSchema = SchemaFactory.createForClass(OperatingZone);

export const OPERATINGZONE_MODEL = OperatingZone.name;
