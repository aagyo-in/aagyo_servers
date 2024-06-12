import { Module } from '@nestjs/common';
import { MongooseConfigService } from "./mongoose-config.service";
import {MongooseModule} from '@nestjs/mongoose'


@Module({
    imports:[
        MongooseModule.forRootAsync({
            useClass:MongooseConfigService,
        }),
    ],
    exports:[MongooseModule]
})
export class DatabaseModule{}