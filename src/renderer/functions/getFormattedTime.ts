/* eslint-disable func-names */
/* eslint-disable no-extend-native */
declare global {
  // eslint-disable-next-line no-unused-vars
  interface String {
    padZero(): string;
  }
  // eslint-disable-next-line no-unused-vars
  interface Number {
    padZero(): string;
  }
}
type ShortTime = `${string}:${string}`;
type LongTime = `${string}:${string}:${string}`;
type DateType = number | string | Date;
type TimeType = ShortTime | LongTime | DateType | undefined;
type FormatType =
  | 'hh:mm:ss'
  | 'hh:mm:ss p'
  | 'hh:mm:ss P'
  | 'hh:mm'
  | 'hh:mm p'
  | 'hh:mm P'
  | 'HH:MM:SS'
  | 'HH:MM'
  | 'elapsed'
  | 'elapsed-seconds'
  | 'quartile'
  | 'quartile-number';
type Period = `${'A' | 'P'}M` | `${'a' | 'p'}m`;
type HoursInNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type HoursInString =
  | 'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine'
  | 'ten'
  | 'eleven'
  | 'twelve';
type Result =
  | ''
  | `${string}:${string}`
  | `${string}:${string}:${string}`
  | `${string}:${string} ${Period}`
  | `${string}:${string}:${string} ${Period}`
  | `${string} ago`
  | `${'Half' | 'Quarter'} ${'past' | 'to'} ${HoursInNumber | HoursInString}`;

String.prototype.padZero = function () {
  return this.padStart(2, '0');
};
Number.prototype.padZero = function () {
  const value = String(this);
  return value.padStart(2, '0');
};
const isValidDate = (value: any): boolean => {
  return !Number.isNaN(new Date(value).valueOf());
};
const get12Hour = (value: string): number => {
  const newValue = Number(value);
  if (newValue) return 0;
  return newValue === 0 || newValue === 12 ? 12 : newValue % 12;
};
type ElapsedTime = [number, number, number, number];
const getElapsedTime = (...time: [DateType, string?, string?]): ElapsedTime => {
  const DEFAULT: ElapsedTime = [0, 0, 0, 0];
  let seconds: number;
  let minutes: number;
  let hours: number;
  let totalSeconds: number;

  if (time.length < 2) {
    const elapsedSeconds = new Date().getTime() - new Date(time[0]).getTime();
    if (elapsedSeconds < 0) return DEFAULT;
    totalSeconds = elapsedSeconds;
    seconds = Math.round(elapsedSeconds / 1000);
    minutes = Math.floor((elapsedSeconds / 60) % 60);
    hours = Math.floor(elapsedSeconds / 60 / 60);
  } else {
    const dateTime = new Date();
    dateTime.setHours(Number(time[0]));
    dateTime.setMinutes(Number(time[1]));
    dateTime.setSeconds(Number(time[2]));
    const elapsedSeconds = new Date().getTime() - dateTime.getTime();
    if (elapsedSeconds < 0) return DEFAULT;
    totalSeconds = elapsedSeconds;
    seconds = Math.round(elapsedSeconds / 1000);
    minutes = Math.floor((elapsedSeconds / 60) % 60);
    hours = Math.floor(elapsedSeconds / 60 / 60);
  }

  return [hours, minutes, seconds, totalSeconds];
};

/**
 * Formats a time based on the specified format.
 *
 * @param time The time to be formatted
 * e.g `2023-04-22T20:10:27.226Z` - ISO Time,
 * `23:18:44` or `23:18`,
 * and any other format that can serve as params of `new Date()`
 *
 * @param format The format to be outputted e.g
 *
 * 12-Hour Time
 * `hh:mm:ss`,
 * `hh:mm:ss p`,
 * `hh:mm:ss P`,
 * `hh:mm`,
 * `hh:mm p`,
 * `hh:mm P`,
 *
 * 24-Hour time
 * `HH:MM:SS`,
 * `HH:MM`,
 *
 * Other Formats
 * `elapsed`,
 * `elapsed-seconds`,
 * `quartile`,
 * `quartile-number`,
 *
 * @example
 * const time = getFormattedTime(new Date(), 'quartile');
 * console.log(time);
 * // => 'Half past nine'
 * @returns The formatted time
 */
export default function getFormattedTime(
  time: TimeType,
  format: FormatType = 'hh:mm P'
): Result {
  if (!time) return '';

  let hour24: string;
  let hour12: string;
  let minute: string;
  let second: string;
  let period: string;
  let result: Result = '';
  let elapsedTime: number = 0;
  let elapsedTimeInSeconds: number = 0;

  if (isValidDate(time)) {
    const dateTime = new Date(time);
    hour24 = dateTime.getHours().padZero();
    hour12 = get12Hour(hour24).padZero();
    minute = dateTime.getMinutes().padZero();
    second = dateTime.getSeconds().padZero();
    period = Number(hour24) < 12 ? 'am' : 'pm';
    const [h, m, s, t] = getElapsedTime(hour24, minute, second);
    elapsedTimeInSeconds = t;
    elapsedTime = h || m || s;
  } else if (
    typeof time === 'string' &&
    /^((0|1)?[1-9]|2[0-3]):[0-5]\d?(:[0-5]\d?)?$/.test(time)
  ) {
    [hour24, minute, second = '00'] = time.padZero();
    hour12 = get12Hour(hour24).padZero();
    period = Number(hour24) < 12 ? 'am' : 'pm';
    const [h, m, s, t] = getElapsedTime(hour24, minute, second);
    elapsedTimeInSeconds = t;
    elapsedTime = h || m || s;
  } else {
    return result;
  }

  if (format === 'hh:mm:ss') result = `${hour12}:${minute}:${second}`;
  if (format === 'hh:mm:ss p')
    result = `${hour12}:${minute}:${second} ${period}`;
  if (format === 'hh:mm:ss P')
    result = `${hour12}:${minute}:${second} ${period.toUpperCase()}`;
  if (format === 'hh:mm') result = `${hour12}:${minute}`;
  if (format === 'hh:mm p') result = `${hour12}:${minute} ${period}`;
  if (format === 'hh:mm P')
    result = `${hour12}:${minute} ${period.toUpperCase()}`;
  if (format === 'HH:MM:SS') result = `${hour24}:${minute}:${second}`;
  if (format === 'HH:MM') result = `${hour24}:${minute}:${second}`;

  if (!elapsedTime || !elapsedTimeInSeconds) return result;
  if (format === 'elapsed') result = `${elapsedTime} ago`;
  if (format === 'elapsed-seconds')
    result = `${elapsedTimeInSeconds} seconds ago`;

  // if (format === 'quartile') result = `${hour24}:${minute}:${second}`;
  // if (format === 'quartile-number') result = `${hour24}:${minute}:${second}`;

  return result;
}
