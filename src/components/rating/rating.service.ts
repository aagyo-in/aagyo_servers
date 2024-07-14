import { Injectable } from "@nestjs/common";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { InjectModel } from "@nestjs/mongoose";
import { RATING_MODEL, RatingDocument } from "src/Schema/rating";
import { Model } from "mongoose";
import { CustomHttpException } from "src/exception/custom-http.exception";

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
      const ratings = products?.map(({ productId, rating }) => {
        return {
          userId,
          productId,
          rating,
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

  getRatingOfProductByID(userId: string, productID: string) {
    try {
      return {
        status: true,
        message: "Rating of product!",
        data: [],
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }
}
