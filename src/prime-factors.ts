export function primeFactorsFor(num: number): number[] {
  let factor = 2;

  while (num % factor !== 0) {
    ++factor;
  }

  const factors = [factor];
  const remainder = num / factor;

  if (remainder > 1) {
    return factors.concat(primeFactorsFor(remainder));
  }

  return factors;
}
