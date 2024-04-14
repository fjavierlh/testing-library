import { Console } from "./Console";
import { Transaction } from "./Transaction";

export class StatementPrinter {
  private readonly header = "Date | Amount | Balance";

  constructor(private console: Console) {}

  print(transactions: Transaction[]): void {
    this.console.log(this.header);
    if (transactions.length > 0) {
      const transaction = transactions[0];
      let runningBalance = 0;
      runningBalance += transaction.amount;
      this.console.log(this.formatStatement(transaction, runningBalance));
    }
  }

  private formatStatement(
    transaction: Transaction,
    runningBalance: number
  ): string {
    const formattedAmount = transaction.amount.toFixed(2);
    const formattedBalance = runningBalance.toFixed(2);
    return `${transaction.date} | ${formattedAmount} | ${formattedBalance}`;
  }
}
