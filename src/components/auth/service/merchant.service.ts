import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CrudService } from "src/base/crud.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import mongoose from "mongoose";

import { JwtService } from "@nestjs/jwt";
import { REGISTERACCOUNT, SENDOTP, SIGNIN, WRONGOTP } from "src/utils/messages";
import { MERCHANT_MODEL, MerchantDocument } from "src/Schema/merchant";
import { MerchantLoginDTO } from "../dto/merchantLogin.dto";
import { VerifyOTPDTO } from "../dto/verifyOTP.dto";
import { RegisterStoreDetailDTO } from "../dto/registerDTO/register-storeDetails.dto";
import { RegisterOwnerDetailDTO } from "../dto/registerDTO/register-ownerDetail.dto";
import { RegisterBankDetailDTO } from "../dto/registerDTO/register-bankDetails.dto";
import { RegisterDocumentDTO } from "../dto/registerDTO/register-document.dto";
import { RegisterTime } from "../dto/registerDTO/register-registerTime.dto";
import { createToken, generateOTP, validateOTP } from "src/utils/helper";
import { ObjectId } from "mongodb";
import { BANKDETAIL_MODEL, BankDetailDocument } from "src/Schema/bankDetail";
import { STORE_MODEL, StoreDocument } from "src/Schema/store";
import {
  DOCUMENTDETAIL_MODEL,
  DocumentDetailDocument,
} from "src/Schema/documents";
import { S3Service } from "src/components/s3/s3.service";
import { CustomHttpException } from "src/exception/custom-http.exception";

@Injectable()
export class MerchantService extends CrudService {
  constructor(
    @InjectModel(MERCHANT_MODEL)
    private readonly merchantModel: Model<MerchantDocument>,
    @InjectModel(BANKDETAIL_MODEL)
    private readonly bankDetailModel: Model<BankDetailDocument>,
    @InjectModel(STORE_MODEL)
    private readonly storeModel: Model<StoreDocument>,
    @InjectModel(DOCUMENTDETAIL_MODEL)
    private readonly documentModel: Model<DocumentDetailDocument>,
    private jwtService: JwtService,
    private s3Service: S3Service
  ) {
    super(merchantModel);
  }

  async signInAccountByPhone(merchantLoginDTO: MerchantLoginDTO) {
    try {
      const { phoneNumber, countryCode, countryName } = merchantLoginDTO;

      const OTP = generateOTP();
      const TOKEN = createToken(OTP);

      // const delimiter = "|";
      // const code = atob(`${phoneNumber}${delimiter}${OTP}${delimiter}${TOKEN}`);
      // console.log("Code==>", code);
      // const decode = btoa(code);
      // console.log("decode==>", decode);

      return {
        status: "OTP_SEND_SUCESSFULLY",
        message: SENDOTP,
        OTP: OTP,
        OTP_TOKEN: TOKEN,
      };
    } catch (err) {
      throw err;
    }
  }

  async verifyOTP(verifyOTPDTO: VerifyOTPDTO) {
    try {
      const { phoneNumber, countryCode, countryName, OTP_TOKEN, OTP } =
        verifyOTPDTO;

      const isValidOTP = validateOTP(OTP, OTP_TOKEN);

      if (!isValidOTP) {
        throw new BadRequestException(WRONGOTP);
      }

      const merchant = await this.merchantModel.findOne({
        contact: phoneNumber,
      });

      let id;
      if (!merchant) {
        const result = await this.merchantModel.create({
          contact: phoneNumber,
        });
        return {
          id: result?._id,
          STEP: 1,
          statusCode: 2,
          status: "PENDING",
          message: REGISTERACCOUNT,
        };
      }
      id = merchant?._id;
      //REGISTER STATUS HANDLE

      const store = await this.storeModel.findOne({ merchant_id: id });
      if (!store) {
        return {
          id,
          STEP: 2,
          statusCode: 2,
          status: "PENDING",
          message: REGISTERACCOUNT,
        };
      }

      if (!store?.isFullTimeOpen) {
        return {
          id,
          STEP: 3,
          statusCode: 2,
          status: "PENDING",
          message: REGISTERACCOUNT,
        };
      }

      const bankDetail = await this.bankDetailModel.findOne({
        merchant_id: id,
      });
      if (!bankDetail) {
        return {
          id,
          STEP: 4,
          statusCode: 2,
          status: "PENDING",
          message: REGISTERACCOUNT,
        };
      }

      const document = await this.documentModel.findOne({ merchant_id: id });
      if (!document) {
        return {
          id,
          STEP: 5,
          statusCode: 2,
          status: "SUCCESS",
          message: REGISTERACCOUNT,
        };
      }

      let { name, email } = merchant;

      const payload = {
        sub: merchant?.id,
        userName: name,
        userEmail: email,
      };
      const access_token = await this.jwtService.signAsync(payload);
      return {
        statusCode: 1,
        status: "ACCOUNT_LOGIN_SUCCESSFULLY",
        access_token: access_token,
        id: merchant?.id,
        message: SIGNIN,
      };
    } catch (err) {
      throw err;
    }
  }

  async registerOwnerDetail(
    sub: string,
    registerOwnerDetailDTO: RegisterOwnerDetailDTO
  ) {
    try {
      const { fullName, email, gender } = registerOwnerDetailDTO;
      const result = await this.merchantModel.findByIdAndUpdate(
        { _id: new ObjectId(sub) },
        {
          $set: {
            name: fullName,
            email,
            gender,
          },
        },
        {
          upsert: true,
        }
      );
      return {
        status: "SUCCESS",
        message: "Owner Details Saved Successfully!",
      };
    } catch (err) {
      throw err;
    }
  }

  async registerStoreDetail(
    id: any,
    registerStoreDetailDTO: RegisterStoreDetailDTO
  ) {
    try {
      const isExist = await this.storeModel.findOne({
        merchant_id: new ObjectId(id),
      });
      if (!isExist) {
        await this.storeModel.create({
          ...registerStoreDetailDTO,
        });

        return {
          status: "SUCCESS",
          message: "Store Details Saved Successfully!",
        };
      } else {
        const { _id } = isExist;
        await this.storeModel.findByIdAndUpdate(
          {
            _id: _id,
          },
          {
            $set: {
              ...registerStoreDetailDTO,
            },
          },
          { upsert: true, new: true }
        );
        return {
          status: "SUCCESS",
          message: "Store Details Updated Successfully!",
        };
      }
    } catch (error) {
      console.log(" error when save store detail", error);
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.merchant_id
      ) {
        throw new HttpException(
          `merchant id is Already in use.`,
          HttpStatus.CONFLICT
        );
      }
      throw new CustomHttpException(error.message);
    }
  }

  async registerStoreTiming(id: any, registerTime: RegisterTime) {
    try {
      const result = await this.storeModel.findOneAndUpdate(
        { merchant_id: new ObjectId(id) },
        {
          $set: {
            ...registerTime,
          },
        },
        { upsert: true }
      );
      return {
        status: "SUCCESS",
        message: "Store Timing Saved Successfully!",
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async registerBankDetail(
    id: any,
    registerBankDetailDTO: RegisterBankDetailDTO
  ) {
    try {
      const isExist = await this.bankDetailModel.findOne({
        merchant_id: new ObjectId(id),
      });

      if (!isExist) {
        await this.bankDetailModel.create({
          ...registerBankDetailDTO,
        });
        return {
          status: "SUCCESS",
          message: "Bank Details Saved Successfully!",
        };
      } else {
        await this.bankDetailModel.findByIdAndUpdate(
          { _id: isExist?._id },
          {
            $set: {
              ...registerBankDetailDTO,
            },
          },
          {
            upsert: true,
          }
        );
        return {
          status: "SUCCESS",
          message: "Bank Details Updated Successfully!",
        };
      }
    } catch (err) {
      throw err;
    }
  }

  async registerDocuments(
    id: string,
    registerDocumentDTO: RegisterDocumentDTO,
    files: Array<Express.Multer.File>
  ) {
    try {
      console.log("register marchent documnet:= ", registerDocumentDTO);
      if (files && files.length > 0) {
        for (const file of files) {
          console.log("fffffffff", file.fieldname);
          let s3Url = await this.s3Service.uploadFile(file);
          console.log("s3uuuuurrrrrll", s3Url);
          switch (file.fieldname) {
            case "panImg":
              console.log(1);
              registerDocumentDTO.pan.panImg = s3Url;
              break;
            case "aadharFrontImage":
              console.log(2);
              registerDocumentDTO.aadhar.aadharFrontImg = s3Url;
              break;
            case "aadharBackImage":
              console.log(3);
              registerDocumentDTO.aadhar.aadharBackImg = s3Url;
              break;
            case "gst":
              console.log(4);
              registerDocumentDTO.gst.img = s3Url;
              break;
            case "store":
              console.log(5);
              registerDocumentDTO.store.img = s3Url;
            case "other":
              // Assuming 'other' is an array, you'll need to handle it correctly
              if (registerDocumentDTO.other.length > 0) {
                registerDocumentDTO.other[0].img = s3Url;
              }
              break;
            default:
              console.warn("Unexpected field name: ", file.fieldname);
          }
        }
      }
      const result = await this.documentModel.create({
        merchant_id: new mongoose.Types.ObjectId(id),
        documents: [registerDocumentDTO], // Store the DTO in the documents field
      });

      console.log("Database result: ", result);
      // const result = await this.documentModel.create({
      //   ...this.registerDocuments,
      // });

      console.log("dbbbb result= ", result);
      const { name, email } = await this.merchantModel.findById(
        new ObjectId(id)
      );
      const payload = {
        sub: id,
        userName: name,
        userEmail: email,
      };
      const access_token = await this.jwtService.signAsync(payload);
      return {
        status: "SUCCESS",
        message: "Document Saved Successfully!",
        data: {
          access_token,
        },
      };
    } catch (err) {
      throw err;
    }
  }

  async getStepById(id: ObjectId) {
    try {
      if (!id) {
        return {
          status: "FAILED",
          STEP: 0,
        };
      }
      const merchant = await this.merchantModel.findOne({
        _id: id,
      });

      if (!merchant?.name) {
        return {
          STEP: 1,
          statusCode: 2,
          status: "PENDING",
        };
      }

      const store = await this.storeModel.findOne({ merchant_id: id });
      if (!store) {
        return {
          STEP: 2,
          statusCode: 2,
          status: "PENDING",
        };
      }

      // if (!store?.slots?.length && !store?.isFullTimeOpen) {
      //   return {
      //     STEP: 3,
      //     statusCode: 2,
      //     status: "PENDING",
      //   };
      // }

      const bankDetail = await this.bankDetailModel.findOne({
        merchant_id: id,
      });
      if (!bankDetail) {
        return {
          STEP: 4,
          statusCode: 2,
          status: "PENDING",
        };
      }

      const document = await this.documentModel.findOne({ merchant_id: id });
      if (!document) {
        return {
          STEP: 5,
          statusCode: 2,
          status: "PENDING",
        };
      }
      return {
        STEP: 6,
        statusCode: 1,
        storeStatus: " store?.openStatus",
        status: "SUCCESS",
      };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async accessMerchnatByAdmin(id: ObjectId) {
    try {
      const result = await this.merchantModel.find({
        _id: id,
      });
      console.log(result);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
