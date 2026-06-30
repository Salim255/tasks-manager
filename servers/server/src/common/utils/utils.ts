export const quoteIfNeeded = (key: string) => {
  return /[A-Z]/.test(key) ? `"${key}"` : key;
};
