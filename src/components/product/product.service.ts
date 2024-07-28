import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PRODUCTMODEL, ProductDocument } from "src/Schema/product";
import { CrudService } from "src/base/crud.service";
import { CreateProductDTO } from "./dto/create-product.dto";
import { ObjectId } from "mongodb";
import { S3Service } from "../s3/s3.service";
import { GetProductDTO } from "./dto/get-product.dto";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { GetProductByCategory } from "./dto/get-productByCategory.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";

@Injectable()
export class ProductService extends CrudService {
  constructor(
    @InjectModel(PRODUCTMODEL)
    private readonly productModel: Model<ProductDocument>,
    private readonly s3Service: S3Service
  ) {
    super(productModel);
  }

  async addProduct(
    id: ObjectId,
    createProductDTO: CreateProductDTO
  ): Promise<any> {
    try {
      const {
        categoryId,
        productName,
        description,
        tags,
        keywords,
        isOrganic,
        varients,
      } = createProductDTO;

      await this.productModel.create({
        productOwner: new ObjectId(id),
        productName,
        categoryId: categoryId && categoryId?.map((item) => new ObjectId(item)),
        description,
        keywords,
        tags,
        isOrganic,
        varients: varients,
        isActive: true,
      });
      return {
        message: "Add Product Sucessfully!",
        status: "SUCCESS",
      };
    } catch (err) {
      throw new CustomHttpException(err.message);
    }
  }

  async getAllProcucts(
    sub: ObjectId,
    getProductDTO: GetProductDTO
  ): Promise<any> {
    try {
      const { limit, page, search } = getProductDTO;

      const aggregationPipeline: any = [
        {
          $match: {
            productName: {
              $regex: `${search || ""}`,
              $options: "i",
            },
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "categoryDetail",
          },
        },
        {
          $unwind: "$categoryDetail",
        },
        {
          $lookup: {
            from: "units",
            localField: "unitId",
            foreignField: "_id",
            as: "unitDetail",
          },
        },
        {
          $unwind: "$unitDetail",
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

      const result = await this.productModel.aggregate(aggregationPipeline);
      console.log(result);
      return {
        message: "Product List!",
        status: "SUCCESS",
        data: result,
      };
    } catch (err) {
      throw new CustomHttpException(err.message);
    }
  }

  async getProductByASpecificCategory(
    getProductByCategory: GetProductByCategory,
    userId: ObjectId
  ) {
    try {
      const { categoryId, limit, page, search } = getProductByCategory;
      const aggregatePipeline: any = [
        {
          $unwind: "$categoryId",
        },
        {
          $match: {
            categoryId: new ObjectId(categoryId),
          },
        },
        {
          $match: {
            productName: {
              $regex: `${search || ""}`,
              $options: "i",
            },
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
      const result = await this.productModel.aggregate(aggregatePipeline);
      return {
        status: true,
        message: "All Product of a specific category",
        data: result,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async updateStatus(id: string, isActive: boolean) {
    try {
      await this.productModel.findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            isActive,
          },
        }
      );
      return {
        status: true,
        message: "Update Status of Product!",
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async updateProductById(id: string, updateProductDTO: UpdateProductDTO) {
    try {
      await this.productModel.findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            ...updateProductDTO,
          },
        }
      );
      return {
        status: true,
        message: "Update Status of Product!",
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async getProductById(id: string): Promise<any> {
    try {
      console.log(id);
      const aggregationPipeline: any = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "categoryDetail",
          },
        },
        {
          $unwind: "$categoryDetail",
        },
      ];

      const result = await this.productModel.aggregate(aggregationPipeline);

      return {
        message: "Product List!",
        status: "SUCCESS",
        data: result[0],
      };
    } catch (err) {
      throw new CustomHttpException(err.message);
    }
  }
}
