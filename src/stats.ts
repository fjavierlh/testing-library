export function sum(numbers: number[]) {
  return numbers.reduce((previous, current) => previous + current, 0);
}

export function average(numbers: number[]) {
  return sum(numbers) / numbers.length;
}
