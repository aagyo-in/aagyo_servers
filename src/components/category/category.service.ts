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
import { CustomHttpException } from "src/exception/custom-http.exception";
import { GetProductsCategory } from "./dto/get-productsCategory.dto";
import { GetStoresCategory } from "./dto/get-categoryOfStore.dto";

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
          $match: {
            createdByAdmin: { $eq: true },
          },
        },
        {
          $group: {
            _id: "$_id",
            category: { $push: "$name" },
          },
        },
        {
          $project: {
            _id: 1,
            category: { $arrayElemAt: ["$category", 0] },
          },
        },
      ];
      const result = await this.categoryModel.aggregate(aggregatePipeline);
      return {
        result: result,
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

  async getAllStoresCategory(
    userId: ObjectId,
    getStoresCategory: GetStoresCategory
  ) {
    try {
      const { limit, page, search } = getStoresCategory;
      const aggregatePipeline: any = [
        {
          $match: {
            createdByAdmin: true,
          },
        },
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
            createdByAdmin: 0,
          },
        },
        {
          $match: {
            name: {
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
      const result = await this.categoryModel.aggregate(aggregatePipeline);
      return {
        status: true,
        message: "All Category of a Store",
        data: result,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
  async getCategoryOfStore(
    categoryOfProducts: GetProductsCategory,
    userId: ObjectId
  ) {
    try {
      const { merchantId, limit, page, search } = categoryOfProducts;
      const aggregatePipeline: any = [
        {
          $match: {
            createdBy: new ObjectId(merchantId),
          },
        },
        {
          $match: {
            name: {
              $regex: `${search || ""}`,
              $options: "i",
            },
          },
        },
        {
          $project: {
            name: 1,
            banner: 1,
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
      const result = await this.categoryModel.aggregate(aggregatePipeline);
      return {
        status: true,
        message: "All Category of a Store",
        data: result,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
}
