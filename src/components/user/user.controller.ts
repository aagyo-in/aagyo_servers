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
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateAddressDTO } from "./dto/create-address.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guards";
import mongoose from "mongoose";
import { UpdateAddressDTO } from "./dto/update-address.dto";

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

  @ApiOperation({ summary: "Get Users Address" })
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: "search", type: String, required: false })
  @Get("address")
  getAllAddress(
    @Req() { user: { sub } }: any,
    @Query("search") search: string
  ) {
    return this.userService.getAllAddress(sub, search);
  }

  @ApiOperation({ summary: "Get A specific  Address By Id" })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", type: String, required: true })
  @Get("get-address/:id")
  getASpecificAddress(
    @Req() { user: { sub } }: any,
    @Param("id") id: mongoose.ObjectId
  ) {
    return this.userService.getASpecificAddress(sub, id);
  }

  @ApiOperation({ summary: "Update A specific  Address" })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", type: String, required: true })
  @Patch("update-address/:id")
  updateAddressById(
    @Req() { user: { sub } }: any,
    @Param("id") id: string,
    @Body() updateAddressDTO: UpdateAddressDTO
  ) {
    return this.userService.updateAddressById(sub, id, updateAddressDTO);
  }

  @ApiOperation({ summary: "Delete A specific  Address" })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", type: String, required: true })
  @Patch("delete-address/:id")
  deleteAddressById(@Req() { user: { sub } }: any, @Param("id") id: string) {
    return this.userService.deleteAddressById(sub, id);
  }
}
