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

  @Prop()
  paymentType: string;

  @Prop()
  zoneCategory: [string];

  @Prop({ required: true })
  mapPath: [];

  @Prop()
  minimumOrderAmount: [
    {
      minimumuOrderValue: number;
      areaRangeInKM: number;
    },
  ];

  @Prop({ type: Object })
  shippingCharge: {
    type: string;
    perKm: [
      {
        perKmCharge: number;
        initialCharge: number;
        initialKm: number;
      },
    ];
    fix: [
      {
        uptoKm: number;
        charge: number;
      },
    ];
  };

  @Prop()
  otherCharges: [
    {
      chargeName: string;
      amount: number;
      isActive: boolean;
    },
  ];
}

export type ZoneDocument = Zone & Document;

export const ZoneSchema = SchemaFactory.createForClass(Zone);

export const ZONE_MODEL = Zone.name;
