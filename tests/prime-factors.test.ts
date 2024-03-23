/*
Cases
2 ⇒ [2]
2 * 2 ⇒ [2,2]
2 * 2 * 2 ⇒ [2,2,2]
3 ⇒ [3]
3 * 3 ⇒ [3,3]
3 * 2 ⇒ [2,3]
5 * 5 ⇒ [5,5]
5 * 7 * 11 * 3 ⇒ [3,5,7,11]
 */

import { primeFactorsFor } from "../src/prime-factors";

describe("The factor primes", () => {
  it("the prime composition of a given number", () => {
    expect(primeFactorsFor(2)).toEqual([2]);
    expect(primeFactorsFor(2 * 2)).toEqual([2, 2]);
    expect(primeFactorsFor(2 * 2 * 2)).toEqual([2, 2, 2]);
    expect(primeFactorsFor(3)).toEqual([3]);
    expect(primeFactorsFor(3 * 3)).toEqual([3, 3]);
    expect(primeFactorsFor(2 * 3)).toEqual([2, 3]);
  });
});
