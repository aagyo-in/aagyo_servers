import { Injectable } from "@nestjs/common";
import { CreateMasterCategoryDTO } from "./dto/create-master-category.dto";
import { InjectModel } from "@nestjs/mongoose";
import {
  MASTER_CATEGORY_MODEL,
  MasterCategoryDocument,
} from "src/Schema/masterCategory/masterCategory.schema";
import { CrudService } from "src/base/crud.service";
import mongoose, { Model, mongo } from "mongoose";
import { ObjectId } from "mongodb";
import { S3Service } from "../s3/s3.service";
import { UpdateMasterCategoryDTO } from "./dto/update-master-category.dto";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { GetStoresCategory } from "../category/dto/get-categoryOfStore.dto";
import { MasterCategoryStatusDTO } from "./dto/update-master-category-status-.dto";
import {
  EditMasterCategoryDTO,
  ImageDTO,
} from "./dto/edit-master-category.dto";

@Injectable()
export class MasterCategoryService extends CrudService {
  constructor(
    @InjectModel(MASTER_CATEGORY_MODEL)
    private readonly masterCategoryModel: Model<MasterCategoryDocument>,
    private readonly s3Service: S3Service
  ) {
    super(masterCategoryModel);
  }

  // get master category
  async getCategory(
    getStoresCategory: GetStoresCategory
  ): Promise<{ result: string[] }> {
    try {
      const { limit, page, search } = getStoresCategory;
      const aggregatePipeline: any = [
        {
          $match: {
            name: {
              $regex: `${search || ""}`,
              $options: "i",
            },
          },
        },
        {
          $sort: { sort: 1 },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            image: 1,
            status: 1,
            sort: 1,
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
        await this.masterCategoryModel.aggregate(aggregatePipeline);
      return {
        result: result,
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }

  // get master category id and name
  async getCategoryIdName(): Promise<{ result: string[] }> {
    try {
      const aggregatePipeline: any = [
        {
          $sort: { sort: 1 },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            status: 1,
          },
        },
      ];
      const result = await this.masterCategoryModel.aggregate(aggregatePipeline);
      return { 
        result,
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }

  // get master category by id
  async getCategoryById(id: string): Promise<{ result: any }> {
    try {
      const _id = new mongo.ObjectId(id);
      const result: any = await this.masterCategoryModel
        .findById(_id)
        .select("_id name image")
        .exec();

      return {
        result,
      };
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
  }

  // create master category
  async createMasterCategory(
    user: any,
    createMasterCategoryDTO: CreateMasterCategoryDTO,
    file: Express.Multer.File
  ): Promise<any> {
    try {
      const { name } = createMasterCategoryDTO;
      const uploadedFile = await this.s3Service.uploadFile(file);

      const categoryData = {
        name: name,
        image: uploadedFile,
      };
      const data = Object.assign(categoryData, { createdBy: user.sub });

      await this.masterCategoryModel.updateMany(
        { sort: { $gte: 1 } },
        { $inc: { sort: 1 } }
      );
      const result = await this.masterCategoryModel.create(data);

      return {
        message: "Master Category Created Sucessfully!",
        status: "SUCCESS",
        result,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Edit master category (name, image)
  async EditMasterCategory(
    id: string,
    editMasterCategoryDTO: EditMasterCategoryDTO,
    file: Express.Multer.File
  ): Promise<any> {
    try {
      const { name, prevImage } = editMasterCategoryDTO;
      const categoryId = new mongoose.Types.ObjectId(id);

      const updateData: any = { name };

      if (file) {
        await this.s3Service.deleteFile(prevImage);
        const uploadedFile = await this.s3Service.uploadFile(file);

        updateData.image = {
          url: uploadedFile.url,
          file: uploadedFile.file,
        };
      }

      const updatedCategory = await this.masterCategoryModel.findByIdAndUpdate(
        categoryId,
        updateData,
        { new: true, runValidators: true }
      );

      return {
        message: "Master Category Updated Sucessfully!",
        status: "SUCCESS",
        updatedCategory,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // update master category status
  async updateMasterCategoryStatus(
    id: string,
    masterCategoryStatusDTO: MasterCategoryStatusDTO
  ): Promise<any> {
    try {
      const { status } = masterCategoryStatusDTO;
      const result = await this.masterCategoryModel.findOneAndUpdate(
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

  // update satting master category
  async updateMasterCategory(
    updateMasterCategoryDTO: UpdateMasterCategoryDTO,
    id: string
  ): Promise<any> {
    try {
      const result = await this.masterCategoryModel.findByIdAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            ...updateMasterCategoryDTO,
          },
        }
      );
      return {
        message: "Master Category Updated Sucessfully!",
        status: "SUCCESS",
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //delete master category
  async deleteMasterCategoryById(id: string) {
    try {
      const result: any = await this.masterCategoryModel.findByIdAndDelete(
        new ObjectId(id)
      );

      if (!result) {
        throw new Error("Category not found");
      }

      const deleteSort = result.sort;
      await this.masterCategoryModel.updateMany(
        { sort: { $gt: deleteSort } },
        { $inc: { sort: -1 } }
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
