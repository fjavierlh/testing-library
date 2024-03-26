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
  return "";
}

describe("The word wrap", () => {
  it("return same output if word does not need be wrapped", () => {
    expect(wordWrap("", 5)).toBe("");
  });
});
