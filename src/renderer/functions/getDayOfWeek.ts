type DayNamesType = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
};

const dayNames: DayNamesType = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const dayNamesShort: DayNamesType = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

/**
 * Get the name of a day in a week based on the day number provided
 * @param num The number of the day in week to convert `0 <= num < 7
 * @param short Determines whether to convert to short notation or not
 * @returns The name of the day corresponding to the number `num` provided
 */
export default function getDayofWeek(num: number, short = false): string {
  const key = num as keyof DayNamesType;
  return short ? dayNamesShort[key] : dayNames[key];
}
