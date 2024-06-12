import { Injectable } from "@nestjs/common";
import { CrudService } from "src/base/crud.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model, mongo } from "mongoose";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { CATEGORY_MODEL, CategoryDocument } from "src/Schema/category";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { S3Service } from "../s3/s3.service";
import { CategoryStatusDTO } from "./dto/update-status.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class CategoryService extends CrudService {
  constructor(
    @InjectModel(CATEGORY_MODEL)
    private readonly categoryModel: Model<CategoryDocument>,
    private readonly s3Service: S3Service
  ) {
    super(categoryModel);
  }
  async createCategory(
    user: any,
    createCategoryDTO: CreateCategoryDTO,
    file: Express.Multer.File
  ): Promise<any> {
    try {
      const { categoryName } = createCategoryDTO;
      const uploadedFile = await this.s3Service.uploadFile(file);

      const createData = {
        name: categoryName,
        banner: uploadedFile,
      };
      const data = Object.assign(createData, { createdBy: user.sub });
      await this.categoryModel.create(data);
      return {
        message: "Category Created Sucessfully!",
        status: "SUCCESS",
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getAllCategory(): Promise<{ result: string[] }> {
    try {
      const aggregatePipeline: any = [
        {
          $match: {},
        },
        {
          $group: {
            _id: null,
            category: { $push: "$name" },
          },
        },
        {
          $project: {
            _id: 0,
            category: 1,
          },
        },
      ];
      const result = await this.categoryModel.aggregate(aggregatePipeline);
      return {
        result: result[0].category,
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }

  async getAllCategoryWithStatus(user: any): Promise<any> {
    try {
      const { sub } = user;
      const aggregatePipeline: any = [
        {
          $match: {
            createdBy: new ObjectId(sub),
          },
        },
        {
          $project: {
            banner: 1,
            name: 1,
            status: 1,
            createdBy: 1,
          },
        },
      ];
      const result = await this.categoryModel.aggregate(aggregatePipeline);
      return {
        result: result,
      };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  async updateCategoryStatus(
    id: any,
    categoryStatusDTO: CategoryStatusDTO
  ): Promise<any> {
    try {
      const { status } = categoryStatusDTO;
      const result = await this.categoryModel.findOneAndUpdate(
        { _id: new mongo.ObjectId(id) },
        {
          $set: {
            status: status,
          },
        }
      );
      return {
        status: "SUCCESS",
        message: "Category Status Updated Successfully",
      };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  async deleteCategoryById(id: ObjectId) {
    try {
      const result = await this.categoryModel.findByIdAndDelete(
        new ObjectId(id)
      );
      return {
        status: "SUCCESS",
        message: "Category deleted Successfully!",
      };
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }
}
