import { stringCalculator } from "../src/string-calculator";

describe("The string calculator", () => {
  it("does not increment the total in case of null or empty expression", () => {
    expect(stringCalculator(null)).toBe(0);
    expect(stringCalculator("")).toBe(0);
  });
  it("convert number in the string to number type", () => {
    expect(stringCalculator("1")).toBe(1);
  });

  it("sum all numbers separated by commas", () => {
    expect(stringCalculator("1,2")).toBe(3);
  });

  it("does not increment the total in case of non numeric symbol", () => {
    expect(stringCalculator("a")).toBe(0);
    expect(stringCalculator("1,a")).toBe(1);
    expect(stringCalculator("1,a,2")).toBe(3);
  });

  it("sum all numbers separated by custom separator", () => {
    expect(stringCalculator("//%/1%2")).toBe(3);
    expect(stringCalculator("//%/1,2")).toBe(0);
    expect(stringCalculator("//#/1#2#3")).toBe(6);
  });
});
