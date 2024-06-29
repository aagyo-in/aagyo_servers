import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { CreateMerchantDTO } from "./dto/createMerchant.dto";
import { CrudService } from "src/base/crud.service";
import { InjectModel } from "@nestjs/mongoose";
import { MERCHANT_MODEL, MerchantDocument } from "src/Schema/merchant";
import mongoose, { Model } from "mongoose";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { MerchantSortFilterDTO } from "./dto/merchantSortFilterDTO";
import { StoreStatus } from "./dto/store-Status.dto";
import { STORE_MODEL, StoreDocument } from "src/Schema/store";
import { ObjectId } from "mongodb";
import { addDays, addHours, format, parse } from "date-fns";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { GetStoresDTO } from "./dto/stores/get-Stores.dto";
import { group } from "console";
import { GetStoreByCategory } from "./dto/stores/get-StoreByCategory.dto";

@Injectable()
export class MerchantService extends CrudService {
  constructor(
    @InjectModel(MERCHANT_MODEL)
    private readonly merchantModel: Model<MerchantDocument>,
    @InjectModel(STORE_MODEL)
    private readonly storeModel: Model<StoreDocument>
  ) {
    super(merchantModel);
  }
  async getAllMerchants(
    merchantSortFilterDTO: MerchantSortFilterDTO
  ): Promise<any> {
    try {
      const { limit, page, search, zone, city } = merchantSortFilterDTO;
      const aggregationPipeline: any = [
        {
          $lookup: {
            from: "stores",
            localField: "_id",
            foreignField: "merchant_id",
            as: "storeDetail",
          },
        },
        {
          $unwind: "$storeDetail",
        },
        {
          $project: {
            email: 1,
            contact: 1,
            createdAt: 1,
            storeName: "$storeDetail.storeName",
            country: "$storeDetail.country",
            state: "$storeDetail.state",
            city: "$storeDetail.city",
            isOpen: "$storeDetail.isOpen",
          },
        },
        {
          $match: {
            storeName: {
              $regex: `${search || ""}`,
              $options: "i",
            },
            city: {
              $regex: `${city || ""}`,
              $options: "i",
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $facet: {
            metadata: [
              { $count: "total" },
              {
                $addFields: {
                  page: +page,
                  maxPage: {
                    $ceil: {
                      $divide: ["$total", +limit],
                    },
                  },
                },
              },
            ],
            data: [{ $skip: (+page - 1) * +limit }, { $limit: +limit }],
          },
        },
      ];
      const result = await this.merchantModel.aggregate(aggregationPipeline);
      return {
        data: result,
        message: "Merchants List",
        status: "SUCCESS",
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler();
    }
  }

  async getMerchantById(id: Object): Promise<any> {
    try {
      const result = await this.merchantModel.findById(id);
      return result;
    } catch (err) {
      throw new ExceptionsHandler(err);
    }
  }

  async createMerchant(
    createMerchantDTO: CreateMerchantDTO
  ): Promise<{ message: string }> {
    try {
      console.log(createMerchantDTO);
      const result = await this.merchantModel.create(createMerchantDTO);
      console.log(result);
      return {
        message: "Merchent Create Sucessfully!",
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }

  async updateMerchant(
    id: Object,
    createMerchantDTO: CreateMerchantDTO
  ): Promise<{ message: string }> {
    try {
      const filter = { _id: id };
      const update = {
        $set: {
          ...createMerchantDTO,
        },
      };
      const result = await this.merchantModel.updateOne(filter, update);
      if (!result) {
        throw new BadRequestException();
      }
      return {
        message: "Merchant Update Sucessfully!",
      };
    } catch (err) {}
  }

  async getAllStoresName(): Promise<{ data: any; message: any }> {
    try {
      const aggregationPipeline: any = [
        {
          $match: {},
        },
        {
          $project: {
            _id: 1,
            merchant_id: 1,
            storeName: 1,
          },
        },
      ];

      const result = await this.storeModel.aggregate(aggregationPipeline);

      return {
        data: result,
        message: "All Stores Name",
      };
    } catch (err) {
      throw new ExceptionsHandler(err);
    }
  }

  async isStoreOpenStatus(
    merchantId: Object,
    storeStatus: StoreStatus
  ): Promise<any> {
    try {
      const { isOpen, autoOpenTime } = storeStatus;
      const curerentDateAndTime = new Date();
      let time: Date;
      switch (autoOpenTime) {
        case "TWOHOUR":
          time = addHours(curerentDateAndTime, 2);
          break;
        case "FOURHOUR":
          time = addHours(curerentDateAndTime, 4);
          break;
        case "TOMMAROW":
          let storeTime: any = await this.storeModel.findOne({
            merchant_id: new Object(merchantId),
          });
          if (storeTime.slots) {
            storeTime = storeTime?.slots[0]?.openTime;
            storeTime = parse(storeTime, "hh:mm a", new Date());
            let nextDate = addDays(storeTime, 1);
            if (nextDate) {
              time = nextDate;
            }
          } else {
            time = addDays(curerentDateAndTime, 1);
          }
          break;
        case "CUSTOM":
          time = new Date();
          break;
        default:
          time = new Date();
          break;
      }

      const result = await this.storeModel.findOneAndUpdate(
        { merchant_id: new Object(merchantId) },
        {
          $set: {
            openStatus: {
              openStatus: isOpen,
              autoOpenTime: time,
            },
          },
        }
      );
      return {
        message: isOpen
          ? "Store Open Successfully!"
          : "Store Close Successfully",
      };
    } catch (error) {
      console.log(error);
      throw new ExceptionsHandler(error);
    }
  }

  async getProfileDetail(merchantId: ObjectId): Promise<any> {
    try {
      const aggregatePipeline: any = [
        {
          $match: {
            _id: new ObjectId(merchantId),
          },
        },
        {
          $lookup: {
            from: "stores",
            localField: "_id",
            foreignField: "merchant_id",
            as: "storeDetail",
          },
        },
        {
          $unwind: "$storeDetail",
        },
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        },
        {
          $lookup: {
            from: "documents",
            localField: "_id",
            foreignField: "merchant_id",
            as: "documentDetail",
          },
        },
        {
          $unwind: "$documentDetail",
        },
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        },
        {
          $lookup: {
            from: "bankdetails",
            localField: "_id",
            foreignField: "merchant_id",
            as: "bankDetail",
          },
        },
        {
          $unwind: "$bankDetail",
        },
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        },
      ];
      const result = await this.merchantModel.aggregate(aggregatePipeline);
      return {
        result: result[0],
      };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }
  async getAllStores(id: ObjectId, getStoresDTO: GetStoresDTO) {
    const { limit, page, search } = getStoresDTO;
    try {
      const aggregatePipeline: any = [
        {
          $match: {
            storeName: {
              $regex: `${search || ""}`,
              $options: "i",
            },
          },
        },
        {
          $project: {
            storeName: 1,
            merchant_id: 1,
            city: 1,
            state: 1,
            address: 1,
            banner: 1,
            isFullTimeOpen: 1,
            slots: 1,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $facet: {
            metadata: [
              { $count: "total" },
              {
                $addFields: {
                  page: +page,
                  maxPage: {
                    $ceil: {
                      $divide: ["$total", +limit],
                    },
                  },
                },
              },
            ],
            data: [{ $skip: (+page - 1) * +limit }, { $limit: +limit }],
          },
        },
      ];

      const result = await this.storeModel.aggregate(aggregatePipeline);
      return {
        status: true,
        message: "All Stores List",
        data: result[0],
      };
    } catch (error) {
      new CustomHttpException(error.message);
    }
  }

  async getAllStoresCategory(id: ObjectId, getStoresDTO: GetStoresDTO) {
    const { limit, page, search } = getStoresDTO;
    try {
      const aggregatePipeline: any = [
        {
          $unwind: "$category",
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "name",
            as: "categoryDetails",
          },
        },
        {
          $unwind: "$categoryDetails",
        },
        {
          $project: {
            _id: "$categoryDetails._id",
            name: "$categoryDetails.name",
            banner: "$categoryDetails.banner",
          },
        },
        {
          $match: {
            name: {
              $regex: `${search || ""}`,
              $options: "i",
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $facet: {
            metadata: [
              { $count: "total" },
              {
                $addFields: {
                  page: +page,
                  maxPage: {
                    $ceil: {
                      $divide: ["$total", +limit],
                    },
                  },
                },
              },
            ],
            data: [{ $skip: (+page - 1) * +limit }, { $limit: +limit }],
          },
        },
      ];

      const result = await this.storeModel.aggregate(aggregatePipeline);
      return {
        status: true,
        message: "All Category List of stores",
        data: result,
      };
    } catch (error) {
      new CustomHttpException(error.message);
    }
  }

  async getStoresByCategory(id: ObjectId, getStoresDTO: GetStoreByCategory) {
    const { limit, page, search, categoryId } = getStoresDTO;
    try {
      const aggregatePipeline: any = [
        {
          $unwind: "$category",
        },
        {
          $match: {
            category: { $eq: categoryId },
          },
        },

        {
          $match: {
            storeName: {
              $regex: `${search || ""}`,
              $options: "i",
            },
          },
        },
        {
          $facet: {
            metadata: [
              { $count: "total" },
              {
                $addFields: {
                  page: +page,
                  maxPage: {
                    $ceil: {
                      $divide: ["$total", +limit],
                    },
                  },
                },
              },
            ],
            data: [{ $skip: (+page - 1) * +limit }, { $limit: +limit }],
          },
        },
      ];

      const result = await this.storeModel.aggregate(aggregatePipeline);
      return {
        status: true,
        message: "All stores of Category",
        data: result,
      };
    } catch (error) {
      new CustomHttpException(error.message);
    }
  }
}
