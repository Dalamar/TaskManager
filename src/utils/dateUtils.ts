export const getNextDates = (date: Date, days: number): Date[] => {
  const dates = [];

  for (let i = 0; i < days; i++) {
    let result = getNextDate(date, i);
    dates.push(result);
  }

  return dates;
};

export const getPreviousDates = (date: Date, days: number): Date[] => {
  const dates = [];

  for (let i = days; i > 0; i--) {
    let result = getPreviousDate(date, i);
    dates.push(result);
  }

  return dates;
};

export const getNextDate = (date: Date, i: number) => {
  let result = new Date(date);
  result.setDate(result.getDate() + i);
  return result;
};

export const getPreviousDate = (date: Date, i: number) => {
  let result = new Date(date);
  result.setDate(result.getDate() - i);
  return result;
};