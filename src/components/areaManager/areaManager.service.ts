import { BadRequestException, Injectable } from "@nestjs/common";
import { CrudService } from "src/base/crud.service";
import { InjectModel } from "@nestjs/mongoose";
import { MERCHANT_MODEL, MerchantDocument } from "src/Schema/merchant";
import { Model } from "mongoose";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { CreateAreaManagerDTO } from "./dto/createAreaManager.dto";
import { AREAMANAGER_MODEL, AreaManagerDocument } from "src/Schema/areaManager";
import { AreaManagerSortFilterDTO } from "./dto/getAreaManager.dto";

@Injectable()
export class AreaManagerService extends CrudService {
  constructor(
    @InjectModel(AREAMANAGER_MODEL)
    private readonly areaManagerModel: Model<AreaManagerDocument>
  ) {
    super(areaManagerModel);
  }
  async createAreaManager(
    createAreaManagerDTO: CreateAreaManagerDTO
  ): Promise<{ message: string }> {
    try {
      const result = await this.areaManagerModel.create(createAreaManagerDTO);
      return {
        message: "Area Manager Create Sucessfully!",
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }

  async getAllAreaManager(
    areaManagerSortFilterDTO: AreaManagerSortFilterDTO
  ): Promise<{ result: any }> {
    try {
      const { limit, page, search } = areaManagerSortFilterDTO;

      const aggregationPipeline: any = [
        {
          $match: {
            name: {
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

      const result = await this.areaManagerModel.aggregate(aggregationPipeline);
      return {
        result,
      };
    } catch (err) {
      throw new ExceptionsHandler(err);
    }
  }

  async deleteAreaManager(id: string): Promise<{ message: string }> {
    try {
      const result = await this.areaManagerModel.findByIdAndDelete(id);
      if (!result) {
        throw new BadRequestException();
      }
      return {
        message: "Area Manger Deleted Sucessfully!",
      };
    } catch (err) {
      throw new err();
    }
  }
  async getAreaManagerById(id: string): Promise<{ result: any }> {
    try {
      const result = await this.areaManagerModel.findById(id);
      return {
        result,
      };
    } catch (err) {
      throw new Error();
    }
  }

  async updateAreaManagerById(
    id: string,
    createAreaManagerDTO: CreateAreaManagerDTO
  ): Promise<{ message: string }> {
    try {
      const filter = { _id: id };
      const update = {
        $set: {
          ...createAreaManagerDTO,
        },
      };
      const result = await this.areaManagerModel.updateOne(filter, update);
      return {
        message: "Updated Sucessfully!",
      };
    } catch (err) {
      throw new Error();
    }
  }
}
