import { fizzBuzz } from "../src/fizz-buzz";

describe("fizzBuzz", () => {
  test("should return '1' if received param is 1", () => {
    const result = fizzBuzz(1);
    const expected = "1";

    expect(result).toBe(expected);
  });

  test("should return 'fizz' if received param is 3", () => {
    const result = fizzBuzz(3);
    const expected = "fizz";

    expect(result).toBe(expected);
  });

  test("should return 'buzz' if received param is 5", () => {
    const result = fizzBuzz(5);
    const expected = "buzz";

    expect(result).toBe(expected);
  });

  test("should return 'fizzbuzz' if received param is 15", () => {
    const result = fizzBuzz(15);
    const expected = "fizzbuzz";

    expect(result).toBe(expected);
  });

  test("should return 'fizz' if received param divisible by 3", () => {
    const result = fizzBuzz(12);
    const expected = "fizz";

    expect(result).toBe(expected);
  });

  test("should return 'buzz' if received param divisible by 5", () => {
    const result = fizzBuzz(10);
    const expected = "buzz";

    expect(result).toBe(expected);
  });

  test("should return 'fizzbuzz' if received param divisible by 3 and 5", () => {
    const result = fizzBuzz(30);
    const expected = "fizzbuzz";

    expect(result).toBe(expected);
  });

  test("should return same stringified number if is not divisible by 3 or 5", () => {
    const result = fizzBuzz(4);
    const expected = "4";

    expect(result).toBe(expected);
  });
});
