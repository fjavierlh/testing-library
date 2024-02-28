const nothingToAdd = 0

export function stringCalculator(expression: string | null): any {
  if (!expression) {
    return nothingToAdd;
  }

  const beginningOfConfig = "//";
  const endOfConfig = "/";
  let separator = ",";

  if (expression.startsWith(beginningOfConfig)) {
    separator = getSeparator(expression, beginningOfConfig, endOfConfig);
    expression = removeConfigFrom(expression, endOfConfig);
  }

  const tokens = expression.split(separator);
  return tokens.map(getNumberFrom).reduce(sum);
}

function removeConfigFrom(expression: string, endOfConfig: string) {
  return expression.slice(expression.lastIndexOf(endOfConfig) + 1);
}

function getSeparator(
  expression: string,
  beginningOfConfig: string,
  endOfConfig: string
) {
  return expression.slice(
    beginningOfConfig.length,
    expression.lastIndexOf(endOfConfig)
  );
}

function sum(previousNumber: number, currentNumber: number): number {
  return previousNumber + currentNumber;
}

function getNumberFrom(token: string): number {
  const parsedToken = Number(token);
  return isNaN(parsedToken) ? nothingToAdd : parsedToken;
}
