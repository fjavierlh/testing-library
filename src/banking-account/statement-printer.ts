import { Console } from "./Console";
import { Transaction } from "./Transaction";

export class StatementPrinter {
  private readonly header = "Date | Amount | Balance";

  constructor(private console: Console) {}

  print(transactions: Transaction[]) {
    this.console.log(this.header);
    if (transactions.length > 0) {
      const transaction = transactions[0];
      const formattedAmount = transaction.amount.toFixed(2);
      this.console.log(
        `${transaction.date} | ${formattedAmount} | ${formattedAmount}`
      );
    }
  }
}
