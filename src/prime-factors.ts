export function primeFactorsFor(num: number): number[] {
  let prime = findTheSmallestPrimeFor(num);
  const remainder = num / prime;
  return remainder <= 1 ? [prime] : [prime].concat(primeFactorsFor(remainder));
}

function findTheSmallestPrimeFor(num: number) {
  let factor = 2;
  while (num % factor !== 0) {
    ++factor;
  }
  return factor;
}
