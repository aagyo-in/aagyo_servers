import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CrudService } from "src/base/crud.service";
import { Model } from "mongoose";
import { CreateDiscountDTO } from "./dto/createDiscount.dto";
import { SortFilterDTO } from "../../common/DTO/sortFilter.dto";
import {
  DISCOUNTOFFER_MODEL,
  DiscountOfferDocument,
} from "src/Schema/discountOffer";

@Injectable()
export class DiscountOfferService extends CrudService {
  constructor(
    @InjectModel(DISCOUNTOFFER_MODEL)
    private readonly discountOfferModel: Model<DiscountOfferDocument>
  ) {
    super(discountOfferModel);
  }

  async getAllDiscountOffer(
    sortFilterDTO: SortFilterDTO
  ): Promise<{ result: any }> {
    try {
      const { limit, page, search } = sortFilterDTO;
      console.log(sortFilterDTO);
      const aggregatePipeline: any = [
        {
          $match: {
            couponCode: {
              $regex: `${search}`,
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
          $project: {
            offerName: 1,
            couponCode: 1,
            discountedAmountUpto: 1,
            dateFrom: 1,
            totalSale: 1,
            useCoupon: 1,
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
      const result = await this.discountOfferModel.aggregate(aggregatePipeline);
      return {
        result,
      };
    } catch (err) {
      throw new err();
    }
  }

  async createDiscountOffer(
    createDiscountDTO: CreateDiscountDTO
  ): Promise<{ message: string; status: boolean }> {
    try {
      const { banner, ...data } = createDiscountDTO;
      console.log(banner);
      const result = await this.discountOfferModel.create(data);
      if (!result) {
        return {
          message: "Shipping Charge  not Saved Sucessfully!",
          status: true,
        };
      }
      return {
        message: "Shipping Charge  saved Sucessfully!",
        status: true,
      };
    } catch (err) {
      throw err;
    }
  }

  async getDiscountOfferById(id: Object): Promise<any> {
    try {
      const result = await this.discountOfferModel.findById(id);
      if (!result) {
        throw new BadRequestException({ message: "Document not found" });
      }
      return {
        result,
      };
    } catch (err) {
      throw new err();
    }
  }

  async deleteDiscountOffer(id: Object): Promise<any> {
    try {
      const result = await this.discountOfferModel.findByIdAndDelete(id);
      if (!result) {
        throw new BadRequestException({ message: "Document not found" });
      }
      return {
        message: "Shipping Charge Deleted Sucessfully!",
      };
    } catch (err) {
      throw new err();
    }
  }

  async updateDiscountOffer(
    id: Object,
    createDiscountDTO: CreateDiscountDTO
  ): Promise<any> {
    try {
      const { banner, ...data } = createDiscountDTO;
      let filter = { _id: id };
      let updatedData = {
        $set: {
          ...data,
        },
      };
      let result = await this.discountOfferModel.findOneAndUpdate(
        filter,
        updatedData
      );
      if (!result) {
        throw new BadRequestException();
      }
      return {
        message: "Shipping Charge Updated Sucessfully!",
      };
    } catch (err) {
      throw new err();
    }
  }
}
