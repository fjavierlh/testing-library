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
  if (text.length <= columnWidth) {
    return text;
  }
  let wrappedText: string;
  let unwrappedText: string;
  const nextSpacePosition = text.indexOf(" ");
  if (nextSpacePosition > -1 && nextSpacePosition < columnWidth) {
    wrappedText = text.substring(0, nextSpacePosition).concat("\n");
    unwrappedText = text.substring(nextSpacePosition + 1);
  } else {
    wrappedText = text.substring(0, columnWidth).concat("\n");
    unwrappedText = text.substring(columnWidth);
  }

  return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
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
});
