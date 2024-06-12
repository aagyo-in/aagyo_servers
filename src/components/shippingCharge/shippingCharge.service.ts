import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SHIPPINGCHARGE_MODEL } from "src/Schema/shippingCharges";
import { CrudService } from "src/base/crud.service";
import { ShippingChargeModule } from "./shippingCharge.module";
import { Model } from "mongoose";
import {
  CreateShippingChargeDTO,
  Status,
} from "./dto/createShippingCharge.dto";
import { SortFilterDTO } from "../../common/DTO/sortFilter.dto";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class ShippingChargeService extends CrudService {
  constructor(
    @InjectModel(SHIPPINGCHARGE_MODEL)
    private readonly shippingChargeModule: Model<ShippingChargeModule>
  ) {
    super(shippingChargeModule);
  }

  async getAllShippingCharge(
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
      const result =
        await this.shippingChargeModule.aggregate(aggregatePipeline);
      return {
        result,
      };
    } catch (err) {
      throw new ExceptionsHandler(err);
    }
  }

  async createShippingCharge(
    createShippingChargeDTO: CreateShippingChargeDTO
  ): Promise<{ message: string; status: boolean }> {
    try {
      const result = await this.shippingChargeModule.create(
        createShippingChargeDTO
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
       throw new ExceptionsHandler(err);
    }
  }

  async getShippingChargeById(id: Object): Promise<any> {
    try {
      const result = await this.shippingChargeModule.findById(id);
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

  async deleteShippingCharge(id: Object): Promise<any> {
    try {
      const result = await this.shippingChargeModule.findByIdAndDelete(id);
      if (!result) {
        throw new BadRequestException({ message: "Document not found" });
      }
      return {
        message: "Shipping Charge Deleted Sucessfully!",
      };
    } catch (err) {
       throw new ExceptionsHandler(err);
    }
  }

  async updateShippingCharge(
    id: Object,
    createShippingChargeDTO: CreateShippingChargeDTO
  ): Promise<any> {
    try {
      let filter = { _id: id };
      let updatedData = {
        $set: {
          ...createShippingChargeDTO,
        },
      };
      let result = await this.shippingChargeModule.findOneAndUpdate(
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
       throw new ExceptionsHandler(err);
    }
  }
}
