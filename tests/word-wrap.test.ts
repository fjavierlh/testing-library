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

  wordWrap(columnWidth: ColumnWidth) {
    if (this.fitsIn(columnWidth)) {
      return WrappeableText.create(this.text);
    }
    const wrappedText = this.wrappedText(columnWidth);
    const unwrappedText = this.unwrappedText(columnWidth);
    return wrappedText.concat(
      WrappeableText.create(unwrappedText.text).wordWrap(columnWidth)
    );
  }

  private fitsIn(columnWidth: ColumnWidth): boolean {
    return this.text.length <= columnWidth.value();
  }

  private wrappedText(columnWidth: ColumnWidth) {
    return WrappeableText.create(
      this.text.substring(0, this.wrapIndex(columnWidth)).concat("\n")
    );
  }

  private unwrappedText(columnWidth: ColumnWidth) {
    return WrappeableText.create(
      this.text.substring(this.unwrapIndex(columnWidth))
    );
  }

  private concat(text: WrappeableText): WrappeableText {
    return WrappeableText.create(this.text.concat(text.text));
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
    return this.text.indexOf(" ");
  }

  private shallWrapBySpace(columnWidth: ColumnWidth) {
    return (
      this.indexOfSpace() > -1 && this.indexOfSpace() < columnWidth.value()
    );
  }
}

describe("The word wrap", () => {
  it("small texts does not need to be wrapped", () => {
    expect(
      WrappeableText.create("hello").wordWrap(ColumnWidth.create(5))
    ).toEqual({ text: "hello" });
  });

  it("words are wrapped when do not fit with the column width", () => {
    expect(
      WrappeableText.create("longword").wordWrap(ColumnWidth.create(4))
    ).toEqual({ text: "long\nword" });
    expect(
      WrappeableText.create("reallylongword").wordWrap(ColumnWidth.create(4))
    ).toEqual({
      text: "real\nlylo\nngwo\nrd",
    });
  });

  it("spaces are preferred for wrapping", () => {
    expect(
      WrappeableText.create("abc def").wordWrap(ColumnWidth.create(4))
    ).toEqual({ text: "abc\ndef" });
    expect(
      WrappeableText.create("abc def ghi").wordWrap(ColumnWidth.create(4))
    ).toEqual({ text: "abc\ndef\nghi" });
    expect(
      WrappeableText.create(" abcd").wordWrap(ColumnWidth.create(4))
    ).toEqual({ text: "\nabcd" });
  });

  it("empty text does not need to be wrapped", () => {
    expect(WrappeableText.create("").wordWrap(ColumnWidth.create(5))).toEqual({
      text: "",
    });
    expect(WrappeableText.create(null).wordWrap(ColumnWidth.create(4))).toEqual(
      { text: "" }
    );
    expect(
      WrappeableText.create(undefined).wordWrap(ColumnWidth.create(4))
    ).toEqual({ text: "" });
  });

  it("does not allow for negative column width", () => {
    expect(() =>
      WrappeableText.create("irrelevant-text").wordWrap(ColumnWidth.create(-1))
    ).toThrow("Negative column width is not allowed");
  });
});
