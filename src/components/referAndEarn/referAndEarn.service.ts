import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateReferAndEarnDTO } from "./dto/create-ReferAndEarn.dto";
import { InjectModel } from "@nestjs/mongoose";
import { REFERANDEARN_MODEL } from "src/Schema/referAndEarn";
import { ReferAndEarnModule } from "./referAndEarn.module";
import { Model } from "mongoose";
import { CrudService } from "src/base/crud.service";
import { readSync } from "fs";

@Injectable()
export class ReferAndEarnService extends CrudService {
  constructor(
    @InjectModel(REFERANDEARN_MODEL)
    private readonly referAndEarnModule: Model<ReferAndEarnModule>
  ) {
    super(referAndEarnModule);
  }
  async createReferAndEarn(
    createReferAndEarnDTO: CreateReferAndEarnDTO
  ): Promise<{ message: string }> {
    try {
      const result = await this.referAndEarnModule.create(
        createReferAndEarnDTO
      );
      if (!result) {
        throw new BadRequestException({ message: "Something went wrong" });
      }

      return {
        message: "Refer And Earn Update Sucessfully",
      };
    } catch (err) {
      throw new err();
    }
  }
}
