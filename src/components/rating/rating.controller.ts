import { Controller, Post, Body, Req, UseGuards, Param } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { CreateRatingDto } from "./dto/create-rating.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guards";

@ApiTags("Ratings")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("rating")
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiOperation({ summary: "Rating by User" })
  @Post("product-rating")
  CreateRatingOfProduct(
    @Req() { user: { sub } }: any,
    @Body() createRatingDto: CreateRatingDto
  ) {
    return this.ratingService.CreateRatingOfProduct(sub, createRatingDto);
  }

  @ApiOperation({ summary: "Rating by User" })
  @ApiParam({ name: "productID", type: String, required: true })
  @Post("get-rating/:productID")
  getRatingOfProductByID(
    @Req() { user: { sub } }: any,
    @Param("productID") productID: string
  ) {
    return this.ratingService.getRatingOfProductByID(sub, productID);
  }
}
