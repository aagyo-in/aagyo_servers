import { Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { ATTRIBUTE_MODEL, AttributeDocument } from "src/Schema/attribute";
import { CrudService } from "src/base/crud.service";
import { CreateAttributeDTO } from "./dto/create-attribute.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class AttributeService extends CrudService {
  constructor(
    @InjectModel(ATTRIBUTE_MODEL)
    private readonly attributeModel: Model<AttributeDocument>
  ) {
    super(attributeModel);
  }

  async createAttribute(
    id: mongoose.Types.ObjectId,
    createAttributeDTO: CreateAttributeDTO
  ): Promise<{ message: string; status: string }> {
    const { name } = createAttributeDTO;
    try {
      const result = await this.attributeModel.create({
        name: name,
        createdBy: new ObjectId(id),
      });
      return {
        status: "SUCCESS",
        message: "Attribute Create Sucessfully!",
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }

  async getAllAttribute(id: mongoose.Types.ObjectId): Promise<{ result: any }> {
    try {
      console.log("id", id);
      const result = await this.attributeModel.find({
        createdBy: new ObjectId(id),
      });

      return {
        result: result,
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }

  async deleteAttributeById(id: String): Promise<{ message: string }> {
    try {
      const result = await this.attributeModel.findByIdAndDelete(id);

      return {
        message: "Attribute Deleted Sucessfullly!",
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }

  async updateAtttributeById(
    id: String,
    value: any
  ): Promise<{ message: string }> {
    try {
      console.log(value);
      const result = await this.attributeModel.findByIdAndUpdate(
        { _id: id },
        { $set: { name: value.name } }
      );
      console.log(result);

      return {
        message: "Attribute Updated Sucessfullly!",
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }
  async getAttributeById(id: String): Promise<{ result: any }> {
    try {
      const result = await this.attributeModel.findById(id);

      return {
        result: result,
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }
}
