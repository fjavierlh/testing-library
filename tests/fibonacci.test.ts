import { fibonacci } from "./../src/fibonacci";

/**
 Fibbonacci Test
 Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
 */

describe("The fibonacci sequence", () => {
  it("yields value zero for number zero", () => {
    const result = fibonacci(0);

    expect(result).toBe(0);
  });
});
