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
function wordWrapOld(
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

function wordWrap(
  text: string,
  columnWidth: number
): string {
  return wordWrapNonPrimitive(
    WrappeableText.create(text),
    ColumnWidth.create(columnWidth)
  );
}

class ColumnWidth {
  private constructor(private readonly width: number) {}

  static create(width: number) {
    if (width < 0) {
      throw new Error("Negative column width is not allowed");
    }
    return new ColumnWidth(width);
  }

  value() {
    return this.width;
  }
}

class WrappeableText {
  private constructor(private readonly text: string) {}

  static create(text: string) {
    if (text == null) {
      return new WrappeableText("");
    }
    return new WrappeableText(text);
  }

  fitsIn(columnWidth: ColumnWidth): boolean {
    return this.value().length <= columnWidth.value();
  }

  wrapIndex(columnWidth: ColumnWidth) {
    const indexOfSpace = this.value().indexOf(" ");
    const shallWrapBySpace =
      indexOfSpace > -1 && indexOfSpace < columnWidth.value();
    return shallWrapBySpace ? indexOfSpace : columnWidth.value();
  }

  unwrapIndex(columnWidth: ColumnWidth) {
    const indexOfSpace = this.value().indexOf(" ");
    const shallWrapBySpace =
      indexOfSpace > -1 && indexOfSpace < columnWidth.value();
    return shallWrapBySpace ? indexOfSpace + 1 : columnWidth.value();
  }

  value() {
    return this.text;
  }
}

function wordWrapNonPrimitive(
  text: WrappeableText,
  columnWidth: ColumnWidth
): string {
  if (text.fitsIn(columnWidth)) {
    return text.value();
  }

  const wrapIndex = text.wrapIndex(columnWidth);
  const unwrapIndex = text.unwrapIndex(columnWidth);
  const wrappedText = text.value().substring(0, wrapIndex).concat("\n");
  const unwrappedText = text.value().substring(unwrapIndex);
  return wrappedText.concat(
    wordWrapNonPrimitive(WrappeableText.create(unwrappedText), columnWidth)
  );
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
  it("small texts does not need to be wrapped", () => {
    expect(wordWrap("hello", 5)).toBe("hello");
  });

  it("words are wrapped when do not fit with the column width", () => {
    expect(wordWrap("longword", 4)).toBe("long\nword");
    expect(wordWrap("reallylongword", 4)).toBe("real\nlylo\nngwo\nrd");
  });

  it("spaces are preferred for wrapping", () => {
    expect(wordWrap("abc def", 4)).toBe("abc\ndef");
    expect(wordWrap("abc def ghi", 4)).toBe("abc\ndef\nghi");
    expect(wordWrap(" abcd", 4)).toBe("\nabcd");
  });

  it("empty text does not need to be wrapped", () => {
    expect(wordWrap("", 5)).toBe("");
    expect(wordWrap(null, 4)).toBe("");
    expect(wordWrap(undefined, 4)).toBe("");
  });

  it("does not allow for negative column width", () => {
    expect(() => wordWrap("irrelevant-text", -1)).toThrow(
      "Negative column width is not allowed"
    );
  });
});
