import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { GetProductDTO } from "../../product/dto/get-product.dto";
import { Transform } from "class-transformer";
import { ObjectId } from "mongodb";

class AdditionalDTO {
  @ApiProperty()
  @Transform(({ value }) => new ObjectId(value))
  merchantId: ObjectId;
}

export class GetProductsCategory extends IntersectionType(
  GetProductDTO,
  AdditionalDTO
) {}
