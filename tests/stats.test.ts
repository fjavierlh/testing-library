import * as stats from "../src/stats";

describe("Stats should", () => {
  it("calculates the sum of all elements of the array", () => {
    const result = stats.sum([1, 2, 3]);
    const expected = 6;
    expect(expected).toBe(result);
  });

  it("calculates the average of all elements of the array", () => {
    const result = stats.average([1, 2, 3]);
    const expected = 2;
    expect(expected).toBe(result);
  });
});
