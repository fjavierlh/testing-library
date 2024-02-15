export function camelCaseConverter(text: string): string {
  function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.substring(1);
  }

  const words = text.split(/[\s_-]/);
  return words.map(capitalize).join("");
}
