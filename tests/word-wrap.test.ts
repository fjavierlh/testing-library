/*
wordWrap('',5) ⇒ ''
wordWrap('hello',5) ⇒ 'hello'
wordWrap('longword',4) ⇒ 'long\nword'
wordWrap('reallylongword',4) ⇒ 'real\nlylo\nngwo\nrd'
wordWrap('abc def',4) ⇒ 'abc\ndef' 
wordWrap('abc def ghi',4) ⇒ 'abc\ndef\nghi'
wordWrap(' abcdf',4) ⇒ '\nabcd\nf'
wordWrap(null,5) ⇒ ''
wordWrap('hello',-5) ⇒ throw exception
*/
function wordWrap(
  text: string | null | undefined,
  columnWidth: number
): string {
  if (columnWidth < 0) {
    throw new Error("Negative column width is not allowed");
  }
  if (!text) {
    return "";
  }
  if (text.length <= columnWidth) {
    return text;
  }

  const wrapIndex = getWrapIndex(text, columnWidth);
  const unwrapIndex = getUnwrapIndex(text, columnWidth);
  const wrappedText = text.substring(0, wrapIndex).concat("\n");
  const unwrappedText = text.substring(unwrapIndex);
  return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
}

function getUnwrapIndex(text: string, columnWidth: number) {
  const indexOfSpace = text.indexOf(" ");
  const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth;
  return shallWrapBySpace ? indexOfSpace + 1 : columnWidth;
}

function getWrapIndex(text: string, columnWidth: number) {
  const indexOfSpace = text.indexOf(" ");
  const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth;
  return shallWrapBySpace ? indexOfSpace : columnWidth;
}

describe("The word wrap", () => {
  it("makes a single line if text not overflow the max column width", () => {
    expect(wordWrap("", 5)).toBe("");
    expect(wordWrap("hello", 5)).toBe("hello");
  });

  it("makes two lines if a text without spaces overflows the max column width once", () => {
    expect(wordWrap("longword", 4)).toBe("long\nword");
  });

  it("makes three lines if a text without spaces overflows the max column width twice", () => {
    expect(wordWrap("reallylongword", 4)).toBe("real\nlylo\nngwo\nrd");
  });

  it("makes lines if a text spaces if complete words overflows the max column width", () => {
    expect(wordWrap("abc def", 4)).toBe("abc\ndef");
    expect(wordWrap("abc def ghi", 4)).toBe("abc\ndef\nghi");
  });

  it("makes empty line if text is falsy value", () => {
    expect(wordWrap(null, 4)).toBe("");
    expect(wordWrap(undefined, 4)).toBe("");
  });

  it("throw an exception if column width is non positive number", () => {
    expect(() => wordWrap("irrelevant-text", -1)).toThrow(
      "Negative column width is not allowed"
    );
  });
});
