export const getTruthyKeys = (obj: { [key: string]: boolean }): string[] => {
  type ObjectKey = keyof typeof obj;

  return Object.keys(obj).filter((key) => obj[key as ObjectKey]);
};
