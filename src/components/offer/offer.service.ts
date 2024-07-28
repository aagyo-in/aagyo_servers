import { Injectable } from "@nestjs/common";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { InjectModel } from "@nestjs/mongoose";
import { OFFER_MODEL, OfferDocument } from "src/Schema/offer";
import { Model } from "mongoose";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { ObjectId } from "mongodb";

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(OFFER_MODEL)
    private readonly offerModel: Model<OfferDocument>
  ) {}

  async createCoupon(storeId: any, createOfferDto: CreateOfferDto) {
    try {
      await this.offerModel.create({ storeId, ...createOfferDto });
      return {
        message: "Coupon Added Successfully!",
        status: true,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async getCoupon(storeId: any) {
    try {
      const data = await this.offerModel.find({
        storeId: new ObjectId(storeId),
      });
      return {
        message: "All Coupons of a specific store!",
        status: true,
        data,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async update(id: any, updateOfferDto: UpdateOfferDto) {
    try {
      const data = await this.offerModel.findByIdAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...updateOfferDto,
          },
        }
      );
      return {
        message: "Update coupon successfully!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async remove(id: any) {
    try {
      const data = await this.offerModel.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return {
        message: "Coupon Deleted Successfully!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async getById(id: any) {
    try {
      const data = await this.offerModel.find({
        _id: new ObjectId(id),
      });
      return {
        message: "Coupon Get Successfully!",
        status: true,
        data,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async updateStatusOfOffer(id: any, isActive: Boolean) {
    try {
      const data = await this.offerModel.findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            isActive,
          },
        }
      );
      return {
        message: "Coupon Get Successfully!",
        status: true,
        data,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
}
