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
import { UnitService } from "./unit.services";
import { CreateUnitDTO } from "./dto/create-unit.dto";
import { AuthGuard } from "src/guards/auth.guards";

@UseGuards(AuthGuard)
@Controller("unit")
export class UnitController {
  constructor(private readonly unitService: UnitService) {}
  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  createUnit(
    @Body() createUnitDTO: CreateUnitDTO,
    @Req() { user: { sub } }: any
  ) {
    return this.unitService.createUnit(createUnitDTO, sub);
  }

  @Get("getAll")
  @HttpCode(HttpStatus.OK)
  getAllAttribute(@Req() { user: { sub } }: any) {
    return this.unitService.getAllUnit(sub);
  }

  @Delete("delete/:id")
  @HttpCode(HttpStatus.OK)
  deleteUnitById(@Param("id") id: string) {
    return this.unitService.deleteUnitById(id);
  }

  @Get("get/:id")
  @HttpCode(HttpStatus.OK)
  getUnitById(@Param("id") id: string) {
    return this.unitService.getUnitById(id);
  }

  @Patch("update/:id")
  @HttpCode(HttpStatus.OK)
  updateUnitById(@Param("id") id: string, @Body() value: any) {
    return this.unitService.updateUnitById(id, value);
  }
}
