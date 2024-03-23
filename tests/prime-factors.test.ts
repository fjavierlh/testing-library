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
  });
});
