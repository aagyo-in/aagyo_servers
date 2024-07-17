import { PartialType } from "@nestjs/swagger";
import { AddCartDto } from "./add-cart.dto";

export class UpdateCartDto extends PartialType(AddCartDto) {}
