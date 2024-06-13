import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export enum TRANSACTIONFILTER {
  ALL = "ALL",
  DELIVERED = "DELIVERED",
  CANCEL = "CANCEL",
  REJECTED = "REJECTED",
}

export class TransactionDTO {
  @ApiProperty({ enum: TRANSACTIONFILTER, enumName: "Filter Type" })
  @IsEnum(TRANSACTIONFILTER)
  filter?: TRANSACTIONFILTER = TRANSACTIONFILTER.ALL;

  @ApiProperty({ required: false, type: String })
  page?: string;

  @ApiProperty({ required: false, type: String })
  limit?: string;
}
