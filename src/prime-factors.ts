export function primeFactorsFor(num: number): number[] {
  let factor = 2;

  if (num % factor !== 0) {
    factor = 3;
  }

  const factors = [factor];
  const remainder = num / factor;

  if (remainder > 1) {
    return factors.concat(primeFactorsFor(remainder));
  }

  return factors;
}
