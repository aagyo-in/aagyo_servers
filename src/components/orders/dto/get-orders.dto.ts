import { OmitType, PartialType } from "@nestjs/swagger";
import { OrderHistoryDTO } from "./order-history.dto";

export class GetOrdersDTO extends PartialType(
  OmitType(OrderHistoryDTO, ["search"] as const)
) {}
