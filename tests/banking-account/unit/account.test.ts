import { Account } from "../../../src/banking-account/Account";
import { Clock } from "../../../src/banking-account/Clock";
import { Console } from "../../../src/banking-account/Console";
import { StatementPrinter } from "../../../src/banking-account/statement-printer";
import { Transaction } from "../../../src/banking-account/Transaction";
import { TransactionRepository } from "../../../src/banking-account/TransactionRepository";

describe("Account", () => {
  const repository = new TransactionRepository(new Clock());
  const statementPrinter = new StatementPrinter(new Console());
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
      new Transaction("25/01/2024", 100),
      new Transaction("24/01/2024", 1000),
      new Transaction("23/01/2024", 100),
    ];
    repository.allTransactions = () => transactions;
    account.printStatement();
    expect(printerSpy).toHaveBeenCalledWith(transactions);
  });
});
