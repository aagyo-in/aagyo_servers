import { PartialType } from "@nestjs/swagger";
import { CreateAddressDTO } from "./create-address.dto";

export class UpdateUserDto extends PartialType(CreateAddressDTO) {}
