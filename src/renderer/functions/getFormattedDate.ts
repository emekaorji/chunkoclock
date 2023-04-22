import getDayofWeek from './getDayOfWeek';
import getMonthName from './getMonthName';
import getOrdinalNumber from './getOrdinalNumber';

/**
 * Formats a date based on the specified format.
 *
 * Example Formats(not restricted to):
 * `DDD, Dth Mmm, YYYY`,
 * `MMM DD, YYYY`,
 * `MMM DTH, YYYY`,
 * `Mmm DD, YYYY`,
 * `Mmm Dth, YYYY`,
 * `MMM DD, YY`,
 * `MMM DTH, YY`,
 * `Mmm DD, YY`,
 * `Mmm Dth, YY`,
 * `Dth of Mmm, YYYY`,
 * `DTH of MMM, YYYY`,
 * `Dth Mmm, YYYY`,
 * `DTH MMM, YYYY`,
 * `YYYY-MM-DD`,
 * `MM-DD-YYYY`,
 * `YY-MM-DD`,
 * `MM-DD-YY`,
 * `YYYY/MM/DD`,
 * `MM/DD/YYYY`,
 * `YY/MM/DD`,
 * `MM/DD/YY`
 *
 * @param date The date to be formatted
 * @param format The format to be used
 * @returns The formatted date
 */

export default function getFormattedDate(
  date: string | number | Date | undefined,
  format: string
): string {
  if (!date) return '';

  const newDate = new Date(date);
  newDate.setTime(
    newDate.getTime() + (newDate.getTimezoneOffset() + 60) * 60000
  );
  const day = newDate.getDay();
  const reDate = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  let newFormat = format;

  const dateObject = {
    DDDD: getDayofWeek(day).toUpperCase(),
    Dddd: getDayofWeek(day),
    DDD: getDayofWeek(day, true).toUpperCase(),
    Ddd: getDayofWeek(day, true),
    DD: reDate.toString().padStart(2, '0'),
    DTH: getOrdinalNumber(reDate).toUpperCase(),
    Dth: getOrdinalNumber(reDate),
    D: reDate.toString(),
    MMMM: getMonthName(month).toUpperCase(),
    Mmmm: getMonthName(month),
    MMM: getMonthName(month, true).toUpperCase(),
    Mmm: getMonthName(month, true),
    MM: (month + 1).toString().padStart(2, '0'),
    YY: parseInt(year.toString().substring(2, 4), 10).toString(),
    YYYY: year.toString(),
  };

  newFormat = newFormat.replace(/D{4,}/, dateObject.DDDD);
  newFormat = newFormat.replace(/Dd{3,}/, dateObject.Dddd);
  newFormat = newFormat.replace(/DDD/, dateObject.DDD);
  newFormat = newFormat.replace(/Ddd/, dateObject.Ddd);
  newFormat = newFormat.replace(/DD/, dateObject.DD);
  newFormat = newFormat.replace(/DTH/, dateObject.DTH);
  newFormat = newFormat.replace(/Dth/, dateObject.Dth);
  newFormat = newFormat.replace(/D/, dateObject.D);
  newFormat = newFormat.replace(/M{4,}/, dateObject.MMMM);
  newFormat = newFormat.replace(/Mm{3,}/, dateObject.Mmmm);
  newFormat = newFormat.replace(/MMM/, dateObject.MMM);
  newFormat = newFormat.replace(/Mmm/, dateObject.Mmm);
  newFormat = newFormat.replace(/MM/, dateObject.MM);
  newFormat = newFormat.replace(/YYYY/, dateObject.YYYY);
  newFormat = newFormat.replace(/YY/, dateObject.YY);

  return newFormat;
}
