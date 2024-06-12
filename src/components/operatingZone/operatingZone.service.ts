import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateZoneDTO } from "./dto/createZone.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CrudService } from "src/base/crud.service";
import { OPERATINGZONE_MODEL } from "src/Schema/operatingZone";
import { OperatingZoneModule } from "./operatingZone.module";
import { Model } from "mongoose";
import { SortFilterDTO } from "../../common/DTO/sortFilter.dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class OperatingZoneService extends CrudService {
  constructor(
    @InjectModel(OPERATINGZONE_MODEL)
    private readonly operatingZoneModule: Model<OperatingZoneModule>
  ) {
    super(operatingZoneModule);
  }
  async createZone(createZoneDTO: CreateZoneDTO): Promise<{ message: string }> {
    try {
      const result = await this.operatingZoneModule.create(createZoneDTO);
      return {
        message: "Operating Zone Created Sucessfully!",
      };
    } catch (err) {
      throw new err();
    }
  }

  async getAllZone(sortFilterDTO: SortFilterDTO): Promise<{ result: any }> {
    try {
      const { limit, page, search } = sortFilterDTO;

      const aggregationPipeline: any = [
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $project: {
            _id: 1,
            city: 1,
            lattitude: 1,
            longitude: 1,
            name: 1,
            status: 1,
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
        await this.operatingZoneModule.aggregate(aggregationPipeline);

      return {
        result,
      };
    } catch (err) {
      throw new err();
    }
  }

  async deleteZone(id: Object): Promise<{ message: any }> {
    try {
      const result = await this.operatingZoneModule.findOneAndDelete(id);
      if (!result) {
        throw new BadRequestException("Zone Not Found!");
      }
      return {
        message: "Zone Deleted Sucessfully!",
      };
    } catch (err) {
      throw err;
    }
  }

  async getOperatingZone(id: string): Promise<{ result: any }> {
    try {
      const result = await this.operatingZoneModule.findById(id);
      if (!result) {
        throw new NotFoundError("Zone Not Found!");
      }
      return {
        result,
      };
    } catch (err) {
      throw new err();
    }
  }

  async updateOperatingZone(
    id: string,
    createZoneDTO: CreateZoneDTO
  ): Promise<{ message: string }> {
    try {
      const filter = { _id: id };
      const update = {
        $set: {
          ...createZoneDTO,
        },
      };
      const result = await this.operatingZoneModule.findByIdAndUpdate(
        filter,
        update
      );
      if (!result) {
        throw new NotFoundError("Zone Not Found!");
      }
      return {
        message: "Zone Updated Sucessfully!",
      };
    } catch (err) {
      throw new err();
    }
  }
}
