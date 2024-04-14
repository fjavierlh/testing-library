import { Clock } from "../../../src/banking-account/Clock";

class TestableClock extends Clock {
  protected today(): Date {
    return new Date("2024-01-25");
  }
}

describe("The Clock", () => {
  it("get today date in dd/mm/yyyy format", () => {
    const clock = new TestableClock();
    const date = clock.todayAsString();
    expect(date).toBe("25/01/2024");
  });
});
