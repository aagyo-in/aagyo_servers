import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

enum FILTERS {
  ORDERS = "ORDERS",
  MONEYDEPOSITE = "MONEYDEPOSITE",
  WITHDRAW = "WITHDRAW",
  SETTLEMENT = "SETTLEMENT",
}

export class TransactionDTO {
  @ApiProperty({ required: false, type: String })
  search?: string;

  @ApiProperty({ enum: FILTERS, enumName: "Filter Type" })
  @IsEnum(FILTERS)
  filter?: FILTERS = FILTERS.ORDERS;

  @ApiProperty({ required: false, type: String })
  page?: string;

  @ApiProperty({ required: false, type: String })
  limit?: string;
}
