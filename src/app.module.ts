import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./infra/mongoose/mongoose.module";
import { MongooseModelsModule } from "./Schema/mongoose-models.module";
import { AuthModule } from "./components/auth/auth.module";
import { MerchantModule } from "./components/merchant/merchant.module";
import { areaManager } from "./components/areaManager/areaManager.module";
import { OperatingZoneModule } from "./components/operatingZone/operatingZone.module";
import { ShippingChargeModule } from "./components/shippingCharge/shippingCharge.module";
import configuration from "./config/configuration";
import { DiscountOfferModule } from "./components/discountOffer/discountOffer.module";
import { CustomerEnquaryModule } from "./components/customerEnquary/customerEnquary.module";
import { ReferAndEarnModule } from "./components/referAndEarn/referAndEarn.module";
import { AttributeModule } from "./components/attribute/attribute.module";
import { UnitModule } from "./components/unit/unit.module";
import { CategoryModule } from "./components/category/category.module";
import { ProductModule } from "./components/product/product.module";
import { MailModule } from "./components/mail/mail.module";
import { OrdersModule } from "./components/orders/orders.module";
import { WalletModule } from "./components/wallet/wallet.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
      cache: true,
      expandVariables: true,
      load: configuration,
    }),
    DatabaseModule,
    MongooseModelsModule,
    AuthModule,
    MerchantModule,
    areaManager,
    OperatingZoneModule,
    ShippingChargeModule,
    DiscountOfferModule,
    CustomerEnquaryModule,
    ReferAndEarnModule,
    AttributeModule,
    UnitModule,
    CategoryModule,
    ProductModule,
    MailModule,
    OrdersModule,
    WalletModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
