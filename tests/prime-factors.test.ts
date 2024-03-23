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

function primeFactorsFor(num: number): number[] {
  return [2];
}

describe("The factor primes", () => {
  it("the prime composition of a given number", () => {
    const result = primeFactorsFor(2);
    expect(result).toEqual([2]);
  });
});
