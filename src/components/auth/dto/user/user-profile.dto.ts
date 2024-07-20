import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from "@nestjs/swagger";
import { MerchantLoginDTO } from "../merchantLogin.dto";

export class AdditionalUserInfo {
  @ApiProperty()
  name: string;
}
export class userProfileDTO extends IntersectionType(
  MerchantLoginDTO,
  AdditionalUserInfo
) {}
