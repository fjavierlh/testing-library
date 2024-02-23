import * as arithmetic from "../src/arithmetic";
import * as calculator from "../src/calculator";

describe("calculator should", () => {
  test("calls arithmetic add", () => {
    const mockedAdd = jest.spyOn(arithmetic, "add");
    mockedAdd.mockImplementation(() => 3)
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
