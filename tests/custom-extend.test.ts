declare namespace jest {
  interface Matchers<R> {
    customToBe(value: unknown): CustomMatcherResult;
    isExactly<T>(...items: T[]): CustomMatcherResult;
  }
}

expect.extend({
  customToBe(expected, received) {
    return {
      pass: expected === received,
      message: () => `Expected: ${expected}\nReceived: ${received}`,
    };
  },
  isExactly<T>(expectedList: T[], ...values: T[]) {
    const haveSameLength = expectedList.length === values.length;
    const haveSameElements = expectedList
      .map((_: T, i: number) => expectedList[i] === values[i])
      .every(Boolean);
    return {
      pass: haveSameLength && haveSameElements,
      message: () => `Expected: ${expectedList}\nReceived: ${values}`,
    };
  },
});

test("should extend jest", () => {
  const list = [10, 20, 30];
  expect(list.length).customToBe(3);
  expect(list).isExactly(10, 20, 30);
});
