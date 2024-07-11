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
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
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
}
