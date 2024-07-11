import { Injectable } from "@nestjs/common";
import { CreateAddressDTO } from "./dto/create-address.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { InjectModel } from "@nestjs/mongoose";
import { AddressDocument, ADDRESSMODEL } from "src/Schema/address";
import { Model } from "mongoose";
import { CrudService } from "src/base/crud.service";
import { ObjectId } from "mongodb";

@Injectable()
export class UserService extends CrudService {
  constructor(
    @InjectModel(ADDRESSMODEL)
    private readonly addressModel: Model<AddressDocument>
  ) {
    super(addressModel);
  }
  async savedAddress(userId: any, createAddressDTO: CreateAddressDTO) {
    try {
      const id = new ObjectId(userId);
      await this.addressModel.create({ ...createAddressDTO, userId: id });
      return {
        status: "SUCCESS",
        message: "Address saved Successfully!",
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async getAllAddress(userId: any, search: string = "") {
    try {
      const aggregatePipeline: any = [
        {
          $match: {
            $and: [
              { userId: new ObjectId(userId) },
              {
                $or: [
                  { name: { $regex: search, $options: "i" } },
                  { phone: { $regex: search, $options: "i" } },
                ],
              },
            ],
          },
        },
      ];
      const data = await this.addressModel.aggregate(aggregatePipeline);
      return {
        status: "SUCCESS",
        message: "User Address!",
        data: data,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
}
