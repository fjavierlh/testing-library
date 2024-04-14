import { Account } from "../../../src/banking-account/Account";
import { StatementPrinter } from "../../../src/banking-account/StatementPrinter";
import { Transaction } from "../../../src/banking-account/Transaction";
import { TransactionRepository } from "../../../src/banking-account/TransactionRepository";

describe("Account", () => {
  const repository = new TransactionRepository();
  const statementPrinter = new StatementPrinter();
  const account = new Account(repository, statementPrinter);
  const addDepositSpy = jest.spyOn(repository, "addDeposit");
  const addWithdrawalSpy = jest.spyOn(repository, "addWithdrawal");
  const printerSpy = jest.spyOn(statementPrinter, "print");

  it("stores a deposit transaction throughout the repository", () => {
    account.deposit(100);
    expect(addDepositSpy).toHaveBeenCalledWith(100);
  });

  it("stores a withdrawal transaction throughout the repository", () => {
    account.withdraw(100);
    expect(addWithdrawalSpy).toHaveBeenCalledWith(100);
  });

  it("print a statement throughout the statement printer", () => {
    const transactions = [
      new Transaction(),
      new Transaction(),
      new Transaction(),
    ];
    repository.allTransactions = () => transactions;
    account.printStatement();
    expect(printerSpy).toHaveBeenCalledWith(transactions);
  });
});
