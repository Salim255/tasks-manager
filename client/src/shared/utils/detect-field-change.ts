export const removedUnchangedField = <T extends Record<string, any>>(
  state: Partial<T>,
  original: T
): Partial<T> => {
  const payload: Partial<T> = {};

  Object.keys(state).forEach((key) => {
    const k = key as keyof T;

    const newValue = state[k];
    const oldValue = original[k];

    // only include changed + defined values
    if (newValue !== undefined && newValue !== oldValue) {
      payload[k] = newValue;
    }
  });

  return payload;
}