export const getTodayInputDate = (): string =>
  new Date().toISOString().split("T")[0];

export const getMinStartDate = (): string =>
  getTodayInputDate();

export const getMaxStartDate = (
  endDate?: string | null
): string | undefined =>
  endDate || undefined;

export const getMinEndDate = (
  startDate?: string | null
): string =>
  startDate || getTodayInputDate();