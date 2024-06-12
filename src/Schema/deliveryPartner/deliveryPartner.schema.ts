import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

@Schema()
export class DeliveryPartner {

  @Prop({ required: true })
  riderDetail:string

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  dlExpiry:Date;

  @Prop({ required: true,default:0 })
  walletBalance:number

  @Prop()
  otp: number;
}

export type DeliveryPartnerDocument = DeliveryPartner & Document;

export const DeliveryPartnerSchema =
  SchemaFactory.createForClass(DeliveryPartner);

export const DELIVERYPARTNER_MODEL = DeliveryPartner.name;
