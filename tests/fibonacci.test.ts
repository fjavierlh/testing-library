import { fibonacci } from "./../src/fibonacci";

/**
 Fibonacci Test
 Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
 */

describe("The fibonacci sequence", () => {
  it("yields value zero for number zero", () => {
    const result = fibonacci(0);

    expect(result).toBe(0);
  });

  it("yields value one for number one", () => {
    const result = fibonacci(1);

    expect(result).toBe(1);
  });

  it("is a series where the value for a number is the addition of the two precedent values", () => {
    expect(fibonacci(2)).toBe(fibonacci(0) + fibonacci(1));
    expect(fibonacci(3)).toBe(fibonacci(1) + fibonacci(2));
    expect(fibonacci(4)).toBe(fibonacci(2) + fibonacci(3));
    expect(fibonacci(5)).toBe(fibonacci(3) + fibonacci(4));
    expect(fibonacci(6)).toBe(fibonacci(4) + fibonacci(5));
  });
});
