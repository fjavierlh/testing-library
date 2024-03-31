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

function wordWrap(text: string, columnWidth: number): string {
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

  wrappedText(columnWidth: ColumnWidth) {
    return this.value().substring(0, this.wrapIndex(columnWidth)).concat("\n");
  }

  unwrappedText(columnWidth: ColumnWidth) {
    return this.value().substring(this.unwrapIndex(columnWidth));
  }

  private wrapIndex(columnWidth: ColumnWidth) {
    return this.shallWrapBySpace(columnWidth)
      ? this.indexOfSpace()
      : columnWidth.value();
  }

  private unwrapIndex(columnWidth: ColumnWidth) {
    return this.shallWrapBySpace(columnWidth)
      ? this.indexOfSpace() + 1
      : columnWidth.value();
  }

  private indexOfSpace() {
    return this.value().indexOf(" ");
  }

  private shallWrapBySpace(columnWidth: ColumnWidth) {
    return (
      this.indexOfSpace() > -1 && this.indexOfSpace() < columnWidth.value()
    );
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

  const wrappedText = text.wrappedText(columnWidth);
  const unwrappedText = text.unwrappedText(columnWidth);
  return wrappedText.concat(
    wordWrapNonPrimitive(WrappeableText.create(unwrappedText), columnWidth)
  );
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
