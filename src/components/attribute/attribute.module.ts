import { Module } from "@nestjs/common";
import { AtrributeController } from "./attribute.controlller";
import { AttributeService } from "./attribute.service";

@Module({
  imports: [],
  controllers: [AtrributeController],
  providers: [AttributeService],
})
export class AttributeModule {}
