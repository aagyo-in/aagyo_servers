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
import { ADDRESSMODEL, AddressSchema } from "./address";
import { RATING_MODEL, RatingSchema } from "./rating";
import { CART_MODEL, CartSchema } from "./cart";
import { USER_MODEL, UserSchema } from "./user";
import { BANNER_MODEL, BannerSchema } from "./banner";
import { OFFER_MODEL, OfferSchema } from "./offer";
import { ZONE_MODEL, ZoneSchema } from "./zone";
import { MASTER_CATEGORY_MODEL, MasterCategorySchema } from "./masterCategory/masterCategory.schema";

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
  { name: MASTER_CATEGORY_MODEL, schema: MasterCategorySchema },
  { name: ORDERMODEL, schema: OrderSchema },
  { name: ADDRESSMODEL, schema: AddressSchema },
  { name: RATING_MODEL, schema: RatingSchema },
  { name: CART_MODEL, schema: CartSchema },
  { name: USER_MODEL, schema: UserSchema },
  { name: BANNER_MODEL, schema: BannerSchema },
  { name: OFFER_MODEL, schema: OfferSchema },
  { name: ZONE_MODEL, schema: ZoneSchema },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelsModule {}
