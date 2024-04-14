import { Account } from "../../../src/banking-account/Account";
import { TransactionRepository } from "../../../src/banking-account/TransactionRepository";

describe("Account", () => {
  const repository = new TransactionRepository();
  const account = new Account(repository);
  const addDepositSpy = jest.spyOn(repository, "addDeposit");

  it("stores a deposit transaction throughout the repository", () => {
    account.deposit(100);
    expect(addDepositSpy).toHaveBeenCalledWith(100);
  });
});
