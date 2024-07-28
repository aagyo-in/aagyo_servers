import { Injectable } from "@nestjs/common";
import { AddSponsoredBannerDto } from "./dto/add-sponsoredBanner.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { InjectModel } from "@nestjs/mongoose";
import { BANNER_MODEL, BannerDocument } from "src/Schema/banner";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { InStoreBannerDTO } from "./dto/add-InStoreBanner.dto";
import { UpdateBannerDto } from "./dto/update-banner.dto";

@Injectable()
export class BannersService {
  constructor(
    @InjectModel(BANNER_MODEL)
    private readonly bannerModel: Model<BannerDocument>
  ) {}

  async addSponsoredBanner(addBannerDto: AddSponsoredBannerDto, storeId: any) {
    try {
      const { categoryId, files, productId, timeFrom, timeTo } = addBannerDto;
      await this.bannerModel.create({
        storeId: new ObjectId(storeId),
        categoryId: new ObjectId(categoryId),
        productId: new ObjectId(productId),
        timeFrom: timeFrom,
        timeTo: timeTo,
        files,
        isSponsor: true,
        isActive: true,
      });
      return {
        message: "Add Bannner Successfully!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async addInStoreBanner(inStoreBannerDTO: InStoreBannerDTO, storeId: any) {
    try {
      const { files } = inStoreBannerDTO;
      await this.bannerModel.create({
        storeId: new ObjectId(storeId),
        files,
        isInStore: true,
        isActive: true,
      });
      return {
        message: "Add Bannner Successfully!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async getSponsorBanners(userId: any) {
    try {
      const aggregatePipeline: any = [
        {
          $match: {
            $and: [{ storeId: new ObjectId(userId) }, { isSponsor: true }],
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "Product",
          },
        },
        {
          $unwind: "$Product",
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "Category",
          },
        },
        {
          $unwind: "$Category",
        },
        {
          $project: {
            timeFrom: 1,
            timeTo: 1,
            files: 1,
            createdAt: 1,
            Product: 1,
            isActive: 1,
            Category: {
              name: 1,
              banner: 1,
              status: 1,
            },
          },
        },
      ];
      const data = await this.bannerModel.aggregate(aggregatePipeline);
      return {
        message: "All Sponsor Bannners of a specific Store!",
        status: true,
        data,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async getInStore(userId: any) {
    try {
      const aggregatePipeline: any = [
        {
          $match: {
            $and: [{ storeId: new ObjectId(userId) }, { isInStore: true }],
          },
        },
      ];
      const data = await this.bannerModel.aggregate(aggregatePipeline);
      return {
        message: "All In Store Bannners of a specific Store!",
        status: true,
        data,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
  async getAllBannersFromAllStores(userId: any) {
    try {
      const aggregatePipeline: any = [
        {
          $match: {
            isSponsor: true,
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "Product",
          },
        },
        {
          $unwind: "$Product",
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "Category",
          },
        },
        {
          $unwind: "$Category",
        },
        {
          $project: {
            timeFrom: 1,
            timeTo: 1,
            files: 1,
            createdAt: 1,
            Product: 1,
            isActive: true,
            Category: {
              name: 1,
              banner: 1,
              status: 1,
            },
          },
        },
      ];
      const data = await this.bannerModel.aggregate(aggregatePipeline);
      return {
        message: "All Sponsored Bannners.",
        status: true,
        data,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async updateSponsorBanner(id: any, updateBannerDto: UpdateBannerDto) {
    try {
      await this.bannerModel.findByIdAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...updateBannerDto,
          },
        }
      );
      return {
        message: "Banner Delete Sucessfully!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
  async deleteBanner(bannerId: any) {
    try {
      await this.bannerModel.findByIdAndDelete({
        _id: new ObjectId(bannerId),
      });
      return {
        message: "Banner Delete Sucessfully!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async updateStatusOfBanner(bannerId: any, isActive: Boolean) {
    try {
      await this.bannerModel.findOneAndUpdate(
        {
          _id: new ObjectId(bannerId),
        },
        {
          $set: {
            isActive,
          },
        }
      );
      return {
        message: "Banner Update Sucessfully!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
}
