export function primeFactorsFor(num: number): number[] {
  let factor = 2;
  while (num % factor !== 0) {
    ++factor;
  }
  const remainder = num / factor;
  return remainder <= 1
    ? [factor]
    : [factor].concat(primeFactorsFor(remainder));
}
