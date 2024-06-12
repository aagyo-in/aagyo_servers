import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CrudService } from "src/base/crud.service";
import { Model } from "mongoose";
import { SortFilterDTO } from "../../common/DTO/sortFilter.dto";
import {
  DISCOUNTOFFER_MODEL,
  DiscountOfferDocument,
} from "src/Schema/discountOffer";
import { CreateCustomerEnquaryDTO } from "./dto/create-CustomerEnquary.dto";

@Injectable()
export class CustomerEnquaryService extends CrudService {
  constructor(
    @InjectModel(DISCOUNTOFFER_MODEL)
    private readonly discountOfferModel: Model<DiscountOfferDocument>
  ) {
    super(discountOfferModel);
  }

  async getAllCustomerEnquary(
    sortFilterDTO: SortFilterDTO
  ): Promise<{ result: any }> {
    try {
      const { limit, page, search } = sortFilterDTO;
      const aggregatePipeline: any = [
        {
          $match: {
            zone: {
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

  async createCustomerEnquary(
    createCustomerEnquaryDTO: CreateCustomerEnquaryDTO
  ): Promise<{ message: string; status: boolean }> {
    try {
      const result = await this.discountOfferModel.create(
        createCustomerEnquaryDTO
      );
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
      throw new err();
    }
  }

  async getCustomerEnquaryById(id: Object): Promise<any> {
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

  async deleteCustomerEnquary(id: Object): Promise<any> {
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

  async updateCustomerEnquary(
    id: Object,
    createCustomerEnquaryDTO: CreateCustomerEnquaryDTO
  ): Promise<any> {
    try {
      let filter = { _id: id };
      let updatedData = {
        $set: {
          ...createCustomerEnquaryDTO,
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
