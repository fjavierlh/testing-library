import { camelCaseConverter } from "../src/camel-case-converter";

describe("Camel case converter", () => {
  test("allow empty text", () => {
    expect(camelCaseConverter("")).toBe("");
  });

  test("allow capitalized word", () => {
    expect(camelCaseConverter("Foo")).toBe("Foo");
  });

  test("join capitalized words separated by spaces", () => {
    expect(camelCaseConverter("Foo Bar")).toBe("FooBar");
  });

  test("join capitalized words separated by hyphens", () => {
    expect(camelCaseConverter("Foo__Bar--Foo")).toBe("FooBarFoo");
  });

  test("join capitalized words separated by hyphens and spaces", () => {
    expect(camelCaseConverter("Foo__Bar--Foo Bar")).toBe("FooBarFooBar");
  });

  test("convert one word to capitalize", () => {
    expect(camelCaseConverter("foo")).toBe("Foo");
  });

  test("convert multiple words to capitalize", () => {
    expect(camelCaseConverter("foo bar foo")).toBe("FooBarFoo");
  });
});
