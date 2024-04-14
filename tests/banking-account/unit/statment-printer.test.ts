import { Console } from "../../../src/banking-account/Console";
import { StatementPrinter } from "../../../src/banking-account/statement-printer";
import { Transaction } from "../../../src/banking-account/Transaction";

describe("The Statement Printer", () => {
  const console = new Console();
  const consoleSpy = jest.spyOn(console, "log");

  it("always print header throughout the console", () => {
    const statementPrinter = new StatementPrinter(console);

    statementPrinter.print([]);

    expect(consoleSpy).toHaveBeenCalledWith("Date | Amount | Balance");
  });

  it("print a statement of account including a given transaction throughout the console", () => {
    const statementPrinter = new StatementPrinter(console);
    const transactions = [new Transaction("25/01/2024", 500)];

    statementPrinter.print(transactions);

    expect(consoleSpy).toHaveBeenCalledWith("Date | Amount | Balance");
    expect(consoleSpy).toHaveBeenCalledWith("25/01/2024 | 500.00 | 500.00");
  });

  it("print a statement of account including a multiple given transactions throughout the console", () => {
    const statementPrinter = new StatementPrinter(console);
    const transactions = [
      new Transaction("24/01/2024", 500),
      new Transaction("25/01/2024", 1000),
      new Transaction("26/01/2024", -100),
    ];

    statementPrinter.print(transactions);

    expect(consoleSpy).toHaveBeenCalledWith("Date | Amount | Balance");
    expect(consoleSpy).toHaveBeenCalledWith("26/01/2024 | -100.00 | 1400.00");
    expect(consoleSpy).toHaveBeenCalledWith("25/01/2024 | 1000.00 | 1500.00");
    expect(consoleSpy).toHaveBeenCalledWith("24/01/2024 | 500.00 | 500.00");
  });
});
