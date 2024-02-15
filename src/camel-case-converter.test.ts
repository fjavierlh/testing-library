import { camelCaseConverter } from "./camel-case-converter";

describe("Camel case converter", () => {
  test("should allow empty text", () => {
    expect(camelCaseConverter("")).toBe("");
  });

  test("should allow capitalized word", () => {
    expect(camelCaseConverter("Foo")).toBe("Foo");
  });

  test("should join capitalized words separated by spaces", () => {
    expect(camelCaseConverter("Foo Bar")).toBe("FooBar");
  });

  test("should join capitalized words separated by spaces", () => {
    expect(camelCaseConverter("Foo Bar")).toBe("FooBar");
  });

  test("should join capitalized words separated by hyphens", () => {
    expect(camelCaseConverter("Foo__Bar--Foo")).toBe("FooBarFoo");
  });

  test("should join capitalized words separated by hyphens and spaces", () => {
    expect(camelCaseConverter("Foo__Bar--Foo Bar")).toBe("FooBarFooBar");
  });

  test("should convert one word to capitalize", () => {
    expect(camelCaseConverter("foo")).toBe("Foo");
  });

  test("should convert multiple words to capitalize", () => {
    expect(camelCaseConverter("foo bar foo")).toBe("FooBarFoo");
  });
});
