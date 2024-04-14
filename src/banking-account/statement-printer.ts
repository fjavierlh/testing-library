import { Console } from "./Console";
import { Transaction } from "./Transaction";

export class StatementPrinter {
  private readonly header = "Date | Amount | Balance";

  constructor(private console: Console) {}

  print(transactions: Transaction[]) {
    console.log("transactions", transactions);
    this.console.log(this.header);
  }
}
