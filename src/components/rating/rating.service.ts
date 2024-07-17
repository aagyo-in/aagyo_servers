import { Injectable } from "@nestjs/common";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { InjectModel } from "@nestjs/mongoose";
import { RATING_MODEL, RatingDocument } from "src/Schema/rating";
import mongoose, { Model } from "mongoose";
import { CustomHttpException } from "src/exception/custom-http.exception";
import { ObjectId } from "mongodb";

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(RATING_MODEL)
    private readonly ratingModel: Model<RatingDocument>
  ) {}

  async CreateRatingOfProduct(
    userId: string,
    createRatingDto: CreateRatingDto
  ) {
    try {
      const { deliveryBoyId, products } = createRatingDto;
      const ratings = products?.map(({ productId, rating, description }) => {
        return {
          userId,
          productId,
          rating,
          description,
        };
      });

      const data = await this.ratingModel.insertMany(ratings);

      return {
        status: true,
        message: "Thanks for givenig rating!",
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async getRatingOfProductByID(userId: string, productID: string) {
    try {
      const aggregatePipeline: any = [
        {
          $match: {
            productId: new ObjectId(productID),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            productId: 1,
            rating: 1,
            description: 1,
            createdAt: 1,
            user: {
              phoneNumber: "$user.phoneNumber",
            },
          },
        },
      ];
      const data = await this.ratingModel.aggregate(aggregatePipeline);

      return {
        status: true,
        message: "Rating of product!",
        data,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
}
