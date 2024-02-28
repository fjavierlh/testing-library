import { stringCalculator } from "../src/string-calculator";

describe("The string calculator", () => {
  test("does not increment the total in case of null or empty expression", () => {
    expect(stringCalculator(null)).toBe(0);
    expect(stringCalculator("")).toBe(0);
  });
  test("convert number in the string to number type", () => {
    expect(stringCalculator("1")).toBe(1);
  });

  test("sum all numbers separated by commas", () => {
    expect(stringCalculator("1,2")).toBe(3);
  });

  test("does not increment the total in case of non numeric symbol", () => {
    expect(stringCalculator("a")).toBe(0);
    expect(stringCalculator("1,a")).toBe(1);
    expect(stringCalculator("1,a,2")).toBe(3);
  });

  test("sum all numbers separated by custom separator", () => {
    expect(stringCalculator("//%/1%2")).toBe(3);
    expect(stringCalculator("//%/1,2")).toBe(0);
    expect(stringCalculator("//#/1#2#3")).toBe(6);
  });
});
