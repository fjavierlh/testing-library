import { Clock } from "../../../src/banking-account/Clock";
import { Transaction } from "../../../src/banking-account/Transaction";
import { TransactionRepository } from "../../../src/banking-account/TransactionRepository";

describe("The transaction repository", () => {
  const amount = 100;
  const today = "12/01/2024";
  const clock = new Clock();
  clock.todayAsString = () => today;
  let repository: TransactionRepository;

  beforeEach(() => {
    repository = new TransactionRepository(clock);
  });

  it("stores a deposit transaction for a given amount", () => {
    const transactions = repository.allTransactions();

    repository.addDeposit(amount);

    expect(transactions[0]).toEqual(new Transaction(today, amount));
  });
  it("stores a withdrawal transaction for a given amount", () => {
    const transactions = repository.allTransactions();

    repository.addWithdrawal(amount);

    expect(transactions[0]).toEqual(new Transaction(today, -amount));
  });
});
