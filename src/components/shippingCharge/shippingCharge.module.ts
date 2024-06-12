import { Module } from "@nestjs/common";
import { ShppingChargeController } from "./shippingCharge.controller";
import { ShippingChargeService } from "./shippingCharge.service";

@Module({
    imports:[],
    controllers:[ShppingChargeController],
    providers:[ShippingChargeService]
})
export class ShippingChargeModule{}