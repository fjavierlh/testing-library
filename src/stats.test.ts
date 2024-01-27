import { expect, test } from "./test-lib";
import { average, sum } from "./stats";

test("should calculates the sum of all elements of the array", () => {
  const result = sum([1, 2, 3]);
  const expected = 6;
  expect(expected).toBe(result);
});

test("should calculates the average of all elements of the array", () => {
  const result = average([1, 2, 3]);
  const expected = 2;
  expect(expected).toBe(result);
});
