import { PartialType, PickType } from "@nestjs/swagger";
import { AddCartDto } from "./add-cart.dto";

export class UpdateCartDTO extends PickType(AddCartDto, ["quantity"] as const) {}
