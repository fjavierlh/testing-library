export function primeFactorsFor(num: number): number[] {
  const factor = 2;
  const factors = [factor];
  const remainder = num / factor;

  if (remainder > 1) {
    return factors.concat(primeFactorsFor(remainder));
  }

  return factors;
}
