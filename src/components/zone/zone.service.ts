import { Injectable } from "@nestjs/common";
import { CreateZoneDto } from "./dto/create-zone.dto";
import { UpdateZoneDto } from "./dto/update-zone.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { InjectModel } from "@nestjs/mongoose";
import { ZONE_MODEL, ZoneDocument } from "src/Schema/zone";
import { Model } from "mongoose";
import { GetZoneDTO } from "./dto/get-zone.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class ZoneService {
  constructor(
    @InjectModel(ZONE_MODEL)
    private readonly zoneModel: Model<ZoneDocument>
  ) {}

  async createZone(createZoneDto: CreateZoneDto) {
    try {
      const count = await this.zoneModel.find().countDocuments();
      await this.zoneModel.create({
        ...createZoneDto,
        zoneId: `Zone-${count + 1}`,
      });
      return {
        message: "Zone Create Successfully!",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async allZones(getZoneDTO: GetZoneDTO) {
    const { limit, page, search } = getZoneDTO;
    try {
      const aggregationPipeline: any = [
        {
          $match: {
            zone: {
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

      const result = await this.zoneModel.aggregate(aggregationPipeline);
      console.log(result);
      return {
        message: "All Zones!",
        status: true,
        data: result,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async deleteZone(id: string) {
    try {
      await this.zoneModel.findOneAndDelete({
        _id: new ObjectId(id),
      });

      return {
        message: "Zone Deleted Successfully",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async updateZone(id: string, updateZoneDto: UpdateZoneDto) {
    try {
     
      await this.zoneModel.findByIdAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            ...updateZoneDto,
          },
        }
      );

      return {
        message: "Zone Deleted Successfully",
        status: true,
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
}
