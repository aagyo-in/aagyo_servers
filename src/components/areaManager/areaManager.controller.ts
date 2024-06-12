import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { AreaManagerService } from "./areaManager.service";
import {   CreateAreaManagerDTO} from "./dto/createAreaManager.dto";
import { AreaManagerSortFilterDTO } from "./dto/getAreaManager.dto";

@Controller("/areaManager")
export class AreaManagerController {
  constructor(private readonly areaManagerService: AreaManagerService) {}

  @Get("/")
  @HttpCode(HttpStatus.OK)
  getAllAreaManager(
    @Query() areaManagerSortFilterDTO: AreaManagerSortFilterDTO
  ) {
    return this.areaManagerService.getAllAreaManager(areaManagerSortFilterDTO);
  }

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  createAreaManager(@Body() createAreaManagerDTO: CreateAreaManagerDTO) {
    return this.areaManagerService.createAreaManager(createAreaManagerDTO);
  }

  @Delete("/delete/:id")
  @HttpCode(HttpStatus.OK)
  deleteAreaManager(@Param("id") id: string) {
    return this.areaManagerService.deleteAreaManager(id);
  }

  @Get("/get/:id")
  @HttpCode(HttpStatus.OK)
  getAreaManagerById(@Param("id") id: string) {
    return this.areaManagerService.getAreaManagerById(id);
  }

  @Patch("/update/:id")
  @HttpCode(HttpStatus.OK)
  updateAreaManagerById(@Param("id") id: string ,@Body() createAreaManagerDTO:CreateAreaManagerDTO ) {
    return this.areaManagerService.updateAreaManagerById(id,createAreaManagerDTO);
  }
}
