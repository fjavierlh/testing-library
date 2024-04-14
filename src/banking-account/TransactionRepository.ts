import { Transaction } from "./Transaction";

export class TransactionRepository {
  allTransactions(): Transaction[] {
    return [];
  }
  addDeposit(amount: number) {}
  addWithdrawal(amount: number) {}
}
