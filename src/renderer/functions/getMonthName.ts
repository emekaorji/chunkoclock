type MonthNamesType = {
  0: 'January' | 'Jan';
  1: 'February' | 'Feb';
  2: 'March' | 'Mar';
  3: 'April' | 'Apr';
  4: 'May' | 'May';
  5: 'June' | 'Jun';
  6: 'July' | 'Jul';
  7: 'August' | 'Aug';
  8: 'September' | 'Sep';
  9: 'October' | 'Oct';
  10: 'November' | 'Nov';
  11: 'December' | 'Dec';
};

const monthNames: MonthNamesType = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

const monthNamesShort: MonthNamesType = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

/**
 * Get the name of a month based on the number provided
 * @param num The number of the month to convert
 * @param short Determines whether to convert to short notation or not
 * @returns The name of the month corresponding to the number `num` provided
 */
export default function getMonthName(num: number, short = false): string {
  const key = num as keyof MonthNamesType;
  return short ? monthNamesShort[key] : monthNames[key];
}
