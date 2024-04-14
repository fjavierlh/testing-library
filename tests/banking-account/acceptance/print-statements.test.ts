import { Clock } from "../../../src/banking-account/Clock";
import { StatementPrinter } from "../../../src/banking-account/statement-printer";
import { TransactionRepository } from "../../../src/banking-account/TransactionRepository";
import { Account } from "./../../../src/banking-account/Account";
import { Console } from "./../../../src/banking-account/Console";

describe("Print statement", () => {
  const console = new Console();
  const consoleSpy = jest.spyOn(console, "log");
  const clock = new Clock();
  clock.todayAsString = jest
    .fn()
    .mockReturnValueOnce("10/01/2022")
    .mockReturnValueOnce("13/01/2022")
    .mockReturnValueOnce("14/01/2022");
  const repository = new TransactionRepository(clock);
  const statementPrinter = new StatementPrinter(console);
  const account = new Account(repository, statementPrinter);

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
