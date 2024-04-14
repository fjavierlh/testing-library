import { Console } from "../../../src/banking-account/Console";
import { StatementPrinter } from "../../../src/banking-account/statement-printer";

describe("The Statement Printer", () => {
  const console = new Console();
  const consoleSpy = jest.spyOn(console, "log");

  it("always print header throughout the console", () => {
    const statementPrinter = new StatementPrinter(console);

    statementPrinter.print([]);

    expect(consoleSpy).toHaveBeenCalledWith("Date | Amount | Balance");
  });
});
