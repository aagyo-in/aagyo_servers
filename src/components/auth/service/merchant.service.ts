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

      if (!store?.slots?.length && !store?.isFullTimeOpen) {
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

  async registerOwnerDetail(registerOwnerDetailDTO: RegisterOwnerDetailDTO) {
    try {
      const { name, id, email } = registerOwnerDetailDTO;
      const result = await this.merchantModel.findByIdAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            name,
            email,
          },
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
    registerStoreDetailDTO: RegisterStoreDetailDTO,
    banner: Express.Multer.File
  ) {
    try {
      const { id, address, category, city, country, storeName, state } =
        registerStoreDetailDTO;
      const uploadFile = await this.s3Service.uploadFile(banner);
      const result = await this.storeModel.create({
        merchant_id: new ObjectId(id),
        storeName,
        category,
        country,
        state,
        city,
        banner: uploadFile,
        address,
      });
      return {
        status: "SUCCESS",
        message: "Store Details Saved Successfully!",
      };
    } catch (error) {
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
      throw error;
    }
  }

  async registerStoreTiming(registerTime: RegisterTime) {
    try {
      const { id, slots, isFullTimeOpen } = registerTime;

      const result = await this.storeModel.findOneAndUpdate(
        { merchant_id: new ObjectId(id) },
        {
          $set: {
            isFullTimeOpen,
            slots: [...slots],
          },
        }
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

  async registerBankDetail(egisterBankDetailDTO: RegisterBankDetailDTO) {
    try {
      const {
        id,
        accountHolderName,
        accountNumber,
        accountType,
        email,
        mobile,
        name,
      } = egisterBankDetailDTO;
      const result = await this.bankDetailModel.create({
        merchant_id: new ObjectId(id),
        accountNumber,
        accountType,
        accountHolderName,
        name,
        email,
        mobile,
      });
      return {
        status: "SUCCESS",
        message: "Bank Details Saved Successfully!",
      };
    } catch (err) {
      throw err;
    }
  }

  async registerDocuments(
    registerDocumentDTO: RegisterDocumentDTO,
    files: Array<Express.Multer.File>
  ) {
    try {
      const { documents, id } = registerDocumentDTO;
      const uploadedFiles = await this.s3Service.uploadMultipleFile(files);
      const documentsData = [];

      for (let data of documents) {
        let obj = {
          documentName: data?.name,
          documentNumber: data?.number,
          documentImg: uploadedFiles?.filter(({ file }) => file == data.name),
        };
        documentsData.push(obj);
      }
      const result = await this.documentModel.create({
        merchant_id: new ObjectId(id),
        documents: [...documentsData],
      });
      console.log(result);

      return {
        status: "SUCCESS",
        message: "Document Saved Successfully!",
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

      if (!store?.slots?.length && !store?.isFullTimeOpen) {
        return {
          STEP: 3,
          statusCode: 2,
          status: "PENDING",
        };
      }

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
        storeStatus: store?.openStatus,
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
