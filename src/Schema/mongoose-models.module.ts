import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ADMIN_MODEL, AdminSchema } from "./admin";
import { MERCHANT_MODEL, MerchantSchema } from "./merchant";
import { AREAMANAGER_MODEL, AreaManagerSchema } from "./areaManager";
import { OPERATINGZONE_MODEL, OperatingZoneSchema } from "./operatingZone";
import { SHIPPINGCHARGE_MODEL, ShippingChargeSchema } from "./shippingCharges";
import { DISCOUNTOFFER_MODEL, DiscountOfferSchema } from "./discountOffer";
import { REFERANDEARN_MODEL, ReferAndEarnSchema } from "./referAndEarn";
import { ATTRIBUTE_MODEL, AttributeSchema } from "./attribute";
import { UNIT_MODEL, UnitSchema } from "./unit";
import { BANKDETAIL_MODEL, BankDetailSchema } from "./bankDetail";
import { STORE_MODEL, StoreSchema } from "./store";
import { DOCUMENTDETAIL_MODEL, DocumentDetailSchema } from "./documents";
import { PRODUCTMODEL, ProductSchema } from "./product";
import { CATEGORY_MODEL, CategorySchema } from "./category";
import { ORDERMODEL, OrderSchema } from "./order";

const MODELS = [
  { name: ADMIN_MODEL, schema: AdminSchema },
  { name: MERCHANT_MODEL, schema: MerchantSchema },
  { name: BANKDETAIL_MODEL, schema: BankDetailSchema },
  { name: STORE_MODEL, schema: StoreSchema },
  { name: AREAMANAGER_MODEL, schema: AreaManagerSchema },
  { name: OPERATINGZONE_MODEL, schema: OperatingZoneSchema },
  { name: SHIPPINGCHARGE_MODEL, schema: ShippingChargeSchema },
  { name: DISCOUNTOFFER_MODEL, schema: DiscountOfferSchema },
  { name: REFERANDEARN_MODEL, schema: ReferAndEarnSchema },
  { name: ATTRIBUTE_MODEL, schema: AttributeSchema },
  { name: UNIT_MODEL, schema: UnitSchema },
  { name: DOCUMENTDETAIL_MODEL, schema: DocumentDetailSchema },
  { name: PRODUCTMODEL, schema: ProductSchema },
  { name: CATEGORY_MODEL, schema: CategorySchema },
  { name: ORDERMODEL, schema: OrderSchema },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelsModule {}
