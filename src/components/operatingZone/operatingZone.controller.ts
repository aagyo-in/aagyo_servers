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
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { OperatingZoneService } from "./operatingZone.service";
import { CreateZoneDTO } from "./dto/createZone.dto";
import { SortFilterDTO } from "../../common/DTO/sortFilter.dto";

@Controller("operatingZone")
export class OperatingZoneController {
  constructor(private readonly operatingZoneService: OperatingZoneService) {}

  @Get("")
  @HttpCode(HttpStatus.OK)
  getAllZone(@Query() sortFilterDTO: SortFilterDTO) {
    return this.operatingZoneService.getAllZone(sortFilterDTO);
  }

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  createZone(@Body() createZoneDTO: CreateZoneDTO) {
    return this.operatingZoneService.createZone(createZoneDTO);
  }

  @Delete("delete/:id")
  @HttpCode(HttpStatus.OK)
  deleteZone(@Param("id") id: string) {
    return this.operatingZoneService.deleteZone(id);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  getOperatingZone(@Param("id") id: string) {
    return this.operatingZoneService.getOperatingZone(id);
  }

  @Patch("update/:id")
  @HttpCode(HttpStatus.OK)
  updateOperatingZone(
    @Param("id") id: string,
    @Body() createZoneDTO: CreateZoneDTO
  ) {
    return this.operatingZoneService.updateOperatingZone(id, createZoneDTO);
  }
}
