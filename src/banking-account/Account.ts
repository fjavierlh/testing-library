import { StatementPrinter } from "./StatementPrinter";
import { TransactionRepository } from "./TransactionRepository";

export class Account {
  constructor(
    private repository: TransactionRepository,
    private statementPrinter: StatementPrinter
  ) {}

  withdraw(amount: number): void {
    this.repository.addWithdrawal(amount);
  }

  deposit(amount: number): void {
    this.repository.addDeposit(amount);
  }
  printStatement(): void {
    this.statementPrinter.print(this.repository.allTransactions());
  }
}
