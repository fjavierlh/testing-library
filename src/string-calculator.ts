export function stringCalculator(expression: string | null): any {
  if (!expression) {
    return 0;
  }
  if (expression.includes(",")) {
    const numbers = expression.split(",");
    return numbers
      .map(Number)
      .reduce(
        (previousNumber, currentNumber) => previousNumber + currentNumber
      );
  }
  return Number(expression);
}
