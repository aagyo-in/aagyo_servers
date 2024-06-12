import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AttributeService } from "./attribute.service";
import { CreateAttributeDTO } from "./dto/create-attribute.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guards";
import { ObjectId } from "mongodb";

@UseGuards(AuthGuard)
@ApiTags("Attributes")
@Controller("attribute")
export class AtrributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  createAttribute(
    @Body() createAttributeDTO: CreateAttributeDTO,
    @Req() { user: { sub } }: any
  ) {
    return this.attributeService.createAttribute(sub, createAttributeDTO);
  }

  @Get("getAll")
  @HttpCode(HttpStatus.OK)
  getAllAttribute(@Req() { user: { sub } }: any) {
    return this.attributeService.getAllAttribute(sub);
  }

  @Get("get/:id")
  @HttpCode(HttpStatus.OK)
  getAttributeById(@Param("id") id: string) {
    return this.attributeService.getAttributeById(id);
  }

  @Delete("delete/:id")
  @HttpCode(HttpStatus.OK)
  deleteAttributeById(@Param("id") id: string) {
    return this.attributeService.deleteAttributeById(id);
  }

  @Patch("update/:id")
  @HttpCode(HttpStatus.OK)
  updateAtttributeById(@Param("id") id: string, @Body() value: any) {
    return this.attributeService.updateAtttributeById(id, value);
  }
}
