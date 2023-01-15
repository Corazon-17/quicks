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

export const extractDate = (
  date: string | undefined,
  toLocale: boolean = false
) => {
  if (!date) {
    return undefined;
  }

  const isoDate = date.slice(0, 10);

  return toLocale ? isoDate.split("-").reverse().join("/") : isoDate;
};

export const extractTime = (date: string | undefined) => {
  if (!date) {
    return undefined;
  }
  
  const isoDate = new Date(date)

  return isoDate.toTimeString().slice(0, 5)
};
