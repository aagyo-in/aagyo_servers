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

  @Prop()
  isOnline: boolean = false;

  @Prop()
  isCOD: boolean = false;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  mapPath: [];

  @Prop()
  zoneCategory: [string];

  @Prop()
  minimumOrderAmount: [
    {
      minimumuOrderValue: string;
      areaRangeInKM: number;
    },
  ];

  @Prop()
  chargeType: string;
  @Prop()
  deliveryChargePerKM: number;
  @Prop()
  initialDeliveryCharge: number;
  @Prop()
  initialKmForInitialDeliveryCharge: number;

  @Prop()
  otherCharges: [
    {
      chargeName: string;
      amount: number;
    },
  ];
}

export type ZoneDocument = Zone & Document;

export const ZoneSchema = SchemaFactory.createForClass(Zone);

export const ZONE_MODEL = Zone.name;
