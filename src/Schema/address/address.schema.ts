import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({ timestamps: false, _id: false })
export class ADDRESS {
  @Prop({ required: true })
  buildingName: string;
  @Prop()
  floor: string;
  @Prop({ required: true })
  area: string;
  @Prop()
  landmark: string;
  @Prop()
  longitude: string;
  @Prop()
  lattitude: string;
}

@Schema({ timestamps: true })
export class Address {
  @Prop({ required: true, ref: "users" })
  userId: mongoose.Types.ObjectId;

  @Prop()
  addressOwner: string = "SELF";

  @Prop()
  addressType: string = "HOME";

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  address: ADDRESS;
}

export type AddressDocument = Address & Document;

export const AddressSchema = SchemaFactory.createForClass(Address);

export const ADDRESSMODEL = Address.name;
