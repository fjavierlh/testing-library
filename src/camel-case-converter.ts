export function camelCaseConverter(text: string): string {
  const words = text.split(/\s|_{1,}|-{1,}/);
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join("");
}
