import { TransactionRepository } from "./TransactionRepository";

export class Account {
  constructor(private repository: TransactionRepository) {}

  withdraw(amount: number): void {
    this.repository.addWithdrawal(amount);
  }

  deposit(amount: number): void {
    this.repository.addDeposit(amount);
  }
  printStatement(): void {}
}
