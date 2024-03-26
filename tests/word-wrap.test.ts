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
  return text;
}

describe("The word wrap", () => {
  it("makes a single line if text not overflow the max column width", () => {
    expect(wordWrap("", 5)).toBe("");
    expect(wordWrap("hello", 5)).toBe("hello");
  });

  it("makes two lines if a text without spaces overflows the max column width once", () => {
    expect(wordWrap("longword", 4)).toBe("long\nword");
  });
});
