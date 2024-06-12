import { Module } from "@nestjs/common";
import { DiscountOfferController } from "./discountOffer.controller";
import { DiscountOfferService } from "./discountOffer.service";

@Module({
    imports:[],
    controllers:[DiscountOfferController],
    providers:[DiscountOfferService]
})
export class DiscountOfferModule{}