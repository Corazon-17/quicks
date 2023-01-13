export const getTruthyKeys = (obj: { [key: string]: boolean }): string[] => {
  type ObjectKey = keyof typeof obj;

  return Object.keys(obj).filter((key) => obj[key as ObjectKey]);
};

export const countDaysLeft = (deadline: string) => {
  const today = new Date();
  const end = new Date(deadline);
  const difference = end.getDate() - today.getDate();

  return difference > 0 ? difference : 0;
};
