// src/dto/create-verify-runner.dto.ts

import { IsString, IsOptional, IsArray } from "class-validator";

class VerificationFieldDto {
  @IsString()
  isverify: string;

  @IsArray()
  @IsOptional()
  reason: string[];
}

export class CreateVerifyRunnerDto {
  @IsString()
  runnerId: string;

  @IsOptional()
  runnerDetails?: {
    fullName?: VerificationFieldDto;
    email?: VerificationFieldDto;
    phone?: VerificationFieldDto;
    gender?: VerificationFieldDto;
    operatingZone?: VerificationFieldDto;
    dutyStatus?: VerificationFieldDto;
  };

  @IsOptional()
  bankDetails?: {
    bankName?: VerificationFieldDto;
    accountHolderName?: VerificationFieldDto;
    accountNumber?: VerificationFieldDto;
  };

  @IsOptional()
  documentsDetails?: {
    aadharCardDetails?: {
      aadharNumber?: VerificationFieldDto;
      aadharFrontImage?: VerificationFieldDto;
    };
    vehicleDetails?: {
      vehicleName?: VerificationFieldDto;
      drivingLicenseImage?: VerificationFieldDto;
    };
  };
}
