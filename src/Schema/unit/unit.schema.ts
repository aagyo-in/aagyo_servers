import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";

@Schema({ timestamps: true })
export class Unit {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    required: true,
  })
  createdBy: mongoose.Schema.Types.ObjectId;
}

export type UnitDocument = Unit & Document;

export const UnitSchema = SchemaFactory.createForClass(Unit);

export const UNIT_MODEL = Unit.name;
