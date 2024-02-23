import * as calculator from "../calculator";
import * as arithmetic from "../arithmetic";

describe("calculator should", () => {
  test("calls arithmetic add", () => {
    const mockedAdd = jest.spyOn(arithmetic, "add");
    const result = calculator.doAdd(1, 2);
    expect(mockedAdd).toHaveBeenLastCalledWith(1, 2);
    expect(result).toBe(3);
  });

  test("calls arithmetic subtract", () => {
    const mockedSubtract = jest.spyOn(arithmetic, "subtract");
    const result = calculator.doSubtract(1, 2);
    expect(mockedSubtract).toHaveBeenLastCalledWith(1, 2);
    expect(result).toBe(-1);
  });
});
