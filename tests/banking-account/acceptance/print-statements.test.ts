import { StatementPrinter } from "../../../src/banking-account/StatementPrinter";
import { TransactionRepository } from "../../../src/banking-account/TransactionRepository";
import { Account } from "./../../../src/banking-account/Account";
import { Console } from "./../../../src/banking-account/Console";

describe("Print statement", () => {
  const console = new Console();
  const repository = new TransactionRepository();
  const statementPrinter = new StatementPrinter();
  const account = new Account(repository, statementPrinter);
  const consoleSpy = jest.spyOn(console, "log");

  it("print an account statements including the transactions made through the console", () => {
    account.deposit(1000);
    account.withdraw(500);
    account.deposit(2000);
    account.printStatement();

    expect(consoleSpy).toHaveBeenCalledWith("Date | Amount | Balance");
    expect(consoleSpy).toHaveBeenCalledWith("14/01/2022 | 2000.00 | 2500.00");
    expect(consoleSpy).toHaveBeenCalledWith("13/01/2022 | -500.00 | 500.00");
    expect(consoleSpy).toHaveBeenCalledWith("10/01/2022 | 1000.00 | 1000.00");
  });
});
