import { Injectable } from "@nestjs/common";
import { AddBannerDto } from "./dto/add-banner.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { InjectModel } from "@nestjs/mongoose";
import { BANNER_MODEL, BannerDocument } from "src/Schema/banner";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";

@Injectable()
export class BannersService {
  constructor(
    @InjectModel(BANNER_MODEL)
    private readonly bannerModel: Model<BannerDocument>
  ) {}

  async addBanner(addBannerDto: AddBannerDto, storeId: any) {
    try {
      await this.bannerModel.create({ storeId, ...addBannerDto });
      return {
        message: "Add Bannner Successfully!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async getBanners(userId: any) {
    try {
      const aggregatePipeline: any = [
        {
          $match: {
            storeId: new ObjectId(userId),
          },
        },
      ];
      const data = await this.bannerModel.aggregate(aggregatePipeline);
      return {
        message: "All Bannners of a specific user!",
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
      ];
      const data = await this.bannerModel.aggregate(aggregatePipeline);
      return {
        message: "All Bannners of a specific user!",
        status: true,
        data,
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
}
