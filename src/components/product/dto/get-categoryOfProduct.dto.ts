import { ApiProperty, IntersectionType } from "@nestjs/swagger";

import { IsString } from "class-validator";
import { GetProductDTO } from "./get-product.dto";
import { Transform } from "class-transformer";
import { ObjectId } from "mongodb";

class AdditionalDTO {
  @ApiProperty()
  @Transform(({ value }) => new ObjectId(value))
  storeId: ObjectId;
}

export class GetCategoryOfProducts extends IntersectionType(
  GetProductDTO,
  AdditionalDTO
) {}
