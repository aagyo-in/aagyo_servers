import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true, strict: true })
export class Runner extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  operatingZone: string;

  @Prop({ required: true })
  dutyStatus: boolean;

  @Prop({ type: Object })
  runnerImage: object; // Store file path

  @Prop({ type: Object, required: true })
  bankDetails: {
    bankName: string;
    accountHoldername: string;
    accountNumber: string;
    accountType: string;
    ifscCode: string;
  };

  @Prop({ type: Object, required: true })
  documentsDetails: {
    aadharCardDetails: {
      aadharNumber: string;
      aadharFrontImage: object; // Store file path
      aadharBackImage: object; // Store file path
    };
    vehicleDetails: {
      vehicleName: string;
      drivingLicenseNumber: string;
      vehicleRegistrationNumber: string;
      drivingLicenseImage: object; // Store file path
      RcImage: object; // Store file path
    };
  };
}

export const RunnerSchema = SchemaFactory.createForClass(Runner);
export const RUNNER_MODEL = Runner.name;
export type RunnerDocument = Runner & Document;
