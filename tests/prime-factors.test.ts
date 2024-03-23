import { primeFactorsFor } from "../src/prime-factors";

describe("The factor primes", () => {
  it("knows that one is a prime number", () => {
    expect(primeFactorsFor(1)).toEqual([1]);
  });

  it("knows what is a prime number", () => {
    expect(primeFactorsFor(2)).toEqual([2]);
    expect(primeFactorsFor(3)).toEqual([3]);
  });

  it("produces the same result to multiply the numbers in the output list", () => {
    expect(primeFactorsFor(2 * 2 * 2)).toEqual([2, 2, 2]);
  });

  it("orders the prime numbers from the smallest to the biggest", () => {
    expect(primeFactorsFor(3 * 5 * 7 * 11)).toEqual([3, 5, 7, 11]);
  });
});
