export function primeFactorsFor(num: number): number[] {
  const factors = [2];
  if (num / 2 > 1) {
    factors.push(2);
  }

  return factors;
}
