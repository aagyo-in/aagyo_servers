import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UNIT_MODEL, UnitDocument } from "src/Schema/unit";
import { CrudService } from "src/base/crud.service";
import { UnitModule } from "./unit.module";
import { Model } from "mongoose";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { CreateUnitDTO } from "./dto/create-unit.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class UnitService extends CrudService {
  constructor(
    @InjectModel(UNIT_MODEL)
    private readonly unitModel: Model<UnitDocument>
  ) {
    super(unitModel);
  }

  async createUnit(
    createUnitDTO: CreateUnitDTO,
    id: ObjectId
  ): Promise<{ message: string; status: string }> {
    const { name } = createUnitDTO;
    try {
      const result = await this.unitModel.create({ name: name, createdBy: id });
      return {
        message: "Unit Created Sucessfully!",
        status: "SUCCESS",
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }

  async getAllUnit(id: ObjectId): Promise<{ result: any }> {
    try {
      const result = await this.unitModel.find({ createdBy: new ObjectId(id) });

      return {
        result: result,
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }
  async deleteUnitById(id: string): Promise<any> {
    try {
      const result = await this.unitModel.findByIdAndDelete(id);

      return {
        message: "Unit delete Sucessfully!",
        status: "SUCCESS",
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }

  async updateUnitById(id: String, value: any): Promise<{ message: string }> {
    try {
      console.log(value);
      const result = await this.unitModel.findByIdAndUpdate(
        { _id: id },
        { $set: { name: value.name } }
      );
      console.log(result);

      return {
        message: "Unit Updated Sucessfullly!",
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }
  async getUnitById(id: String): Promise<{ result: any }> {
    try {
      const result = await this.unitModel.findById(id);

      return {
        result: result,
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }
}
