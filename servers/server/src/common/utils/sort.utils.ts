type HasCreatedAt = {
  createdAt: string | Date;
};

export const sortByDate = <T extends HasCreatedAt>(list: T[]): T[] => {
  return [...list].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};