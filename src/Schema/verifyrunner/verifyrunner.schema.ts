// src/schema/verify-runner.schema.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class VerifyRunner {
  @Prop({ required: true })
  runnerId: string; // Reference to the runner

  @Prop({ type: Object, default: { isverify: "", reason: [] } })
  runnerDetails: {
    fullName?: { isverify: string; reason: string[] };
    email?: { isverify: string; reason: string[] };
    phone?: { isverify: string; reason: string[] };
    gender?: { isverify: string; reason: string[] };
    operatingZone?: { isverify: string; reason: string[] };
    dutyStatus?: { isverify: string; reason: string[] };
  };

  @Prop({ type: Object, default: { isverify: "", reason: [] } })
  bankDetails: {
    bankName?: { isverify: string; reason: string[] };
    accountHolderName?: { isverify: string; reason: string[] };
    accountNumber?: { isverify: string; reason: string[] };
  };

  @Prop({ type: Object, default: { isverify: "", reason: [] } })
  documentsDetails: {
    aadharCardDetails?: {
      aadharNumber?: { isverify: string; reason: string[] };
      aadharFrontImage?: { isverify: string; reason: string[] };
    };
    vehicleDetails?: {
      vehicleName?: { isverify: string; reason: string[] };
      drivingLicenseImage?: { isverify: string; reason: string[] };
    };
  };
}

export const VerifyRunnerSchema = SchemaFactory.createForClass(VerifyRunner);
export const VERIFYRUNNER_MODEL = VerifyRunner.name;
export type VerifyRunnerDocument = VerifyRunner & Document;
