export function primeFactorsFor(num: number): number[] {
  checkForPositiveNumber(num);
  return primeFactors(num);
}

function checkForPositiveNumber(num: number) {
  if (num < 1) throw Error("Only positive numbers are allowed");
}

function primeFactors(num: number) {
  let prime = findTheSmallestPrimeFor(num);
  const remainder = num / prime;
  return remainder <= 1 ? [prime] : [prime].concat(primeFactorsFor(remainder));
}

function findTheSmallestPrimeFor(num: number) {
  if (num === 1) return num;
  let factor = 2;
  while (num % factor !== 0) {
    ++factor;
  }
  return factor;
}
