export function camelCaseConverter(text: string): string {
  function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.substring(1);
  }

  const words = text.split(/\s|_{1,}|-{1,}/);
  return words.map(capitalize).join("");
}
