import * as calculator from "../calculator";
import * as arithmetic from "../arithmetic";

jest.mock("../arithmetic");

describe("calculator should", () => {
  test("calls arithmetic add", () => {
    const result = calculator.doAdd(1, 2);
    expect(arithmetic.add).toHaveBeenLastCalledWith(1, 2);
    // expect(result).toBe(3);
  });

  test("calls arithmetic subtract", () => {
    const result = calculator.doSubtract(1, 2);
    expect(arithmetic.subtract).toHaveBeenLastCalledWith(1, 2);
    // expect(result).toBe(-1);
  });
});
