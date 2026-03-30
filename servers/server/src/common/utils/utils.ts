export const quoteIfNeeded = (key: string) => {
  // Si le champ contient une majuscule → on le quote
  return /[A-Z]/.test(key) ? `"${key}"` : key;
};
