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
  Query,
} from "@nestjs/common";
import { ZoneService } from "./zone.service";
import { CreateZoneDto } from "./dto/create-zone.dto";
import { UpdateZoneDto } from "./dto/update-zone.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guards";
import { GetZoneDTO } from "./dto/get-zone.dto"; 
import { EditZoneDto } from "./dto/edit-zone.dto";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags("zone")
@Controller("zone")
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @ApiOperation({ summary: "Create Zone" })
  @HttpCode(HttpStatus.CREATED)
  @Post("create")
  createZone(@Body() createZoneDto: CreateZoneDto) {
    return this.zoneService.createZone(createZoneDto);
  }

  @ApiOperation({ summary: "Create Zone" })
  @HttpCode(HttpStatus.OK)
  @Patch("edit/:id")
  editZone(@Body() editZoneDto: EditZoneDto, @Param("id") id: string) {
    return this.zoneService.editZone(editZoneDto, id);
  }

  @ApiOperation({ summary: "Get All  Zone" })
  @HttpCode(HttpStatus.OK)
  @Get("")
  allZones(@Query() getZoneDTO: GetZoneDTO) {
    return this.zoneService.allZones(getZoneDTO);
  }

  @ApiOperation({ summary: "Get  Zone by id" })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  getZoneById(@Param("id") id: string) {
    return this.zoneService.getZoneById(id);
  }

  @ApiOperation({ summary: "Delete  Zone" })
  @HttpCode(HttpStatus.OK)
  @Delete("/delete/:id")
  deleteZone(@Param("id") id: string) {
    return this.zoneService.deleteZone(id);
  }

  @ApiOperation({ summary: "Update Zone" })
  @HttpCode(HttpStatus.OK)
  @Patch("/update/:id")
  updateZone(@Param("id") id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zoneService.updateZone(id, updateZoneDto);
  }
}
