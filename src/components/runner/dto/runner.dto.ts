import { IsString, IsObject, IsBoolean, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class RunnerDetailsDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  operatingZone: string;

  @IsBoolean()
  @IsNotEmpty()
  dutyStatus: boolean;

  runnerImage?: object; // Updated to string to store file path or URL
}

export class BankDetailsDto {
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountHoldername: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  accountType: string;

  @IsString()
  @IsNotEmpty()
  ifscCode: string;
}

export class AadharCardDetailsDto {
  @IsString()
  @IsNotEmpty()
  aadharNumber: string;

  aadharFrontImage?: object; // Updated to string to store file path or URL

  aadharBackImage?: object; // Updated to string to store file path or URL
}

export class VehicleDetailsDto {
  @IsString()
  @IsNotEmpty()
  vehicleName: string;

  @IsString()
  @IsNotEmpty()
  drivingLicenseNumber: string;

  @IsString()
  @IsNotEmpty()
  vehicleRegistrationNumber: string;

  drivingLicenseImage?: object; // Updated to string to store file path or URL

  RcImage?: object; // Updated to string to store file path or URL
}

export class DocumentsDetailsDto {
  @Type(() => AadharCardDetailsDto)
  aadharCardDetails: AadharCardDetailsDto;

  @Type(() => VehicleDetailsDto)
  vehicleDetails: VehicleDetailsDto;
}

export class CreateRunnerDto {
  @Type(() => RunnerDetailsDto)
  runnerDetails: RunnerDetailsDto;

  @Type(() => BankDetailsDto)
  bankDetails: BankDetailsDto;

  @Type(() => DocumentsDetailsDto)
  documentsDetails: DocumentsDetailsDto;
}
