export const addIfChanged = <T, K extends keyof T>(
  key: K,
  value: T[K] | undefined,
  original: T[K] | undefined
): Partial<T> => {
  if (value === undefined) return {};
  if (value === original) return {};

  return { [key]: value } as Partial<T>;
};