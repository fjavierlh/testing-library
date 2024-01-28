import { describe, expect, it } from "./test-lib";

import * as stats from "./stats";
import * as asyncStats from "./stats-async";

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

describe("Async stats should", () => {
  it("calculates the async um of all elements of the array", async () => {
    const result = await asyncStats.sum([1, 2, 3]);
    const expected = 6;
    expect(expected).toBe(result);
  });

  it("calculates the async average of all elements of the array", async () => {
    const result = await asyncStats.average([1, 2, 3]);
    const expected = 2;
    expect(expected).toBe(result);
  });
});
