import { OmitType } from "@nestjs/mapped-types";
import { TransactionDTO } from "./transaction.dto";

export class SettledPaymentDTO extends OmitType(TransactionDTO, [
  "filter",
] as const) {}
