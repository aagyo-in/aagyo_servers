import { Injectable } from "@nestjs/common";
import { CreateZoneDto } from "./dto/create-zone.dto";
import { UpdateZoneDto } from "./dto/update-zone.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { InjectModel } from "@nestjs/mongoose";
import { ZONE_MODEL, ZoneDocument } from "src/Schema/zone";
import mongoose, { Model } from "mongoose";
import { GetZoneDTO } from "./dto/get-zone.dto";
import { ObjectId } from "mongodb";
import { EditZoneDto } from "./dto/edit-zone.dto";

@Injectable()
export class ZoneService {
  constructor(
    @InjectModel(ZONE_MODEL)
    private readonly zoneModel: Model<ZoneDocument>
  ) {}

  async createZone(createZoneDto: CreateZoneDto) {
    try {
      const lastZone = await this.zoneModel
        .findOne()
        .sort({ zoneId: -1 })
        .select("zoneId")
        .exec();

      console.log(lastZone);

      let newZoneId = "Z0001";
      if (lastZone) {
        const lastIdNumber = parseInt(lastZone.zoneId.replace("Z", ""), 10);
        const newIdNumber = lastIdNumber + 1;

        newZoneId = `Z${newIdNumber.toString().padStart(4, "0")}`;
      }

      await this.zoneModel.create({
        ...createZoneDto,
        zoneId: newZoneId,
      });
      return {
        message: "Zone Create Successfully!",
        status: true,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async editZone(editZoneDTO: EditZoneDto, id: string) {
    try {
      const zoneId = new mongoose.Types.ObjectId(id);

      const updatedData = {
        ...editZoneDTO,
      };

      const updatedZone = await this.zoneModel.findByIdAndUpdate(
        zoneId,
        updatedData,
        { new: true, runValidators: true }
      );

      return {
        message: "Master Category Updated Sucessfully!",
        status: "SUCCESS",
        updatedZone,
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

  async getZoneById(id: string) {
    try {
      const zone = await this.zoneModel.findOne({
        _id: new ObjectId(id),
      });

      return {
        message: "Zone Get Successfully",
        status: true,
        data: zone,
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
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async updateZone(id: string, updateZoneDto: UpdateZoneDto) {
    try {
      console.log(updateZoneDto);
      const result = await this.zoneModel.findByIdAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            ...updateZoneDto,
          },
        }
      );
      console.log(result);
      return {
        message: "Zone Update Successfully",
        status: true,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
}
