import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateAddressDTO } from "./dto/create-address.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guards";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Saved adreess of user" })
  @HttpCode(HttpStatus.CREATED)
  @Post("saved-address")
  savedAddress(
    @Req() { user: { sub } }: any,
    @Body() createAddressDTO: CreateAddressDTO
  ) {
    return this.userService.savedAddress(sub, createAddressDTO);
  }
}
