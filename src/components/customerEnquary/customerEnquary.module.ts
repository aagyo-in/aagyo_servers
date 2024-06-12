import { Module } from "@nestjs/common";
import { CustomerEnquaryController } from "./customerEnquary.controller";
import { CustomerEnquaryService } from "./customerEnquary.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [],
  controllers: [CustomerEnquaryController],
  providers: [CustomerEnquaryService],
})
export class CustomerEnquaryModule {}
