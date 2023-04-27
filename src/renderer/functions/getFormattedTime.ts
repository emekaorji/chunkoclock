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
type Quartile =
  | `${'Half' | 'Quarter'} ${'past' | 'to'} ${HoursInNumber | HoursInString}`
  | '';
type Result =
  | ''
  | `${string}:${string}`
  | `${string}:${string}:${string}`
  | `${string}:${string} ${Period}`
  | `${string}:${string}:${string} ${Period}`
  | `${string} ago`
  | Quartile;
type ElapsedTime = `${string} ago` | '';
type ElapsedTimeArr = [ElapsedTime, ElapsedTime];

String.prototype.padZero = function () {
  return this.padStart(2, '0');
};
Number.prototype.padZero = function () {
  const value = String(this);
  return value.padStart(2, '0');
};

const getWord = (value: number) => {
  const numberToWord = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
  ];
  return numberToWord[value];
};
const isValidDate = (value: any): boolean => {
  return !Number.isNaN(new Date(value).valueOf());
};
const get12Hour = (value: string | number): number => {
  const newValue = Number(value);
  if (!newValue) return 0;
  return newValue === 0 || newValue === 12 ? 12 : newValue % 12;
};
const getElapsedTimeString = (elapsedSeconds: number): ElapsedTimeArr => {
  const DEFAULT: ElapsedTimeArr = ['', ''];

  if (elapsedSeconds < 0) return DEFAULT;
  const seconds = Math.round(elapsedSeconds / 1000);
  const unit1 = seconds === 1 ? 'second' : 'seconds';
  const elapsedTimeInSeconds: ElapsedTime = `${seconds} ${unit1} ago`;
  const minutes = Math.floor((seconds / 60) % 60);
  const hours = Math.floor(seconds / 60 / 60);
  const finalTime = hours || minutes || seconds;
  const unit2 =
    finalTime === hours
      ? finalTime === 1
        ? 'hour'
        : 'hours'
      : finalTime === minutes
      ? finalTime === 1
        ? 'minute'
        : 'minutes'
      : finalTime === 1
      ? 'second'
      : 'seconds';
  const elapsedTime: ElapsedTime = `${finalTime} ${unit2} ago`;

  return [elapsedTime, elapsedTimeInSeconds];
};
const getElapsedTime = (
  ...time: [DateType, string?, string?]
): ElapsedTimeArr => {
  let elapsedTime: ElapsedTime;
  let elapsedTimeInSeconds: ElapsedTime;

  if (time.length < 2) {
    const elapsedSeconds = new Date().getTime() - new Date(time[0]).getTime();
    [elapsedTime, elapsedTimeInSeconds] = getElapsedTimeString(elapsedSeconds);
  } else {
    const dateTime = new Date();
    dateTime.setHours(Number(time[0]));
    dateTime.setMinutes(Number(time[1]));
    dateTime.setSeconds(Number(time[2]));
    const elapsedSeconds = new Date().getTime() - dateTime.getTime();
    [elapsedTime, elapsedTimeInSeconds] = getElapsedTimeString(elapsedSeconds);
  }

  return [elapsedTime, elapsedTimeInSeconds];
};
const getQuartileTime = (
  ...time: [
    Date | string,
    string | 'number' | 'word',
    (string | 'number' | 'word')?
  ]
): Quartile => {
  let hours: number | string;
  let minutes: number | string;
  let measure: 'Quarter' | 'Half' | '';
  let direction: 'to' | 'past';

  if (time.length < 3) {
    hours = get12Hour(new Date(time[0]).getHours());
    minutes = new Date(time[0]).getMinutes();
    measure =
      (minutes >= 10 && minutes <= 20) || (minutes >= 40 && minutes <= 50)
        ? 'Quarter'
        : minutes >= 25 && minutes <= 35
        ? 'Half'
        : '';
    direction = minutes >= 35 ? 'to' : 'past';
    hours = minutes >= 35 ? hours + 1 : hours;
    if (time[1] === 'word' || !time[1]) hours = getWord(hours);
  } else {
    hours = Number(time[0]);
    minutes = Number(time[1]);
    measure =
      (minutes >= 10 && minutes <= 20) || (minutes >= 40 && minutes <= 50)
        ? 'Quarter'
        : minutes >= 25 && minutes <= 35
        ? 'Half'
        : '';
    direction = minutes >= 35 ? 'to' : 'past';
    hours = minutes >= 35 ? hours + 1 : hours;
    if (time[2] === 'word' || !time[2]) hours = getWord(hours);
  }

  if (!measure || !direction || !hours) return '';

  return `${measure} ${direction} ${hours as HoursInNumber | HoursInString}`;
};
const convertPeriod = (inputTime: string): string => {
  let time = inputTime;

  const clockPeriodTest =
    /^((0|1)?[0-9]|2[0-3]):[0-5]\d?(:[0-5]\d?)?((\s?(A|P)M)?|(\s?(a|p)m)?)$/;
  const periodTest = /(((A|P)M)|((a|p)m))$/g;
  const spacedPeriodTest = /((\s?(A|P)M)|(\s?(a|p)m))$/g;

  if (clockPeriodTest.test(time)) {
    const periodMatch = (time.match(periodTest)! || [])[0]?.toLowerCase();
    time = time.replace(spacedPeriodTest, '');
    let [h, m, s = '00'] = time.split(':');
    h = periodMatch === 'pm' ? (Number(h) + 12).padZero() : h;
    m = m.padZero();
    s = s.padZero();
    return [h, m, s].join(':');
  }

  return inputTime;
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
  inputTime: TimeType,
  format: FormatType = 'hh:mm P'
): Result {
  if (!inputTime) return '';

  const clockTest =
    /^((0|1)?[0-9]|2[0-3]):[0-5]\d?(:[0-5]\d?)?((\s?(A|P)M)?|(\s?(a|p)m)?)$/;

  let time = inputTime;
  let hour24: string;
  let hour12: string;
  let minute: string;
  let second: string;
  let period: string;
  let result: Result = '';
  let elapsedTime: ElapsedTime = '';
  let elapsedTimeInSeconds: ElapsedTime = '';
  let quartile: Quartile = '';
  let quartileInNumber: Quartile = '';

  if (isValidDate(time)) {
    const dateTime = new Date(time);
    hour24 = dateTime.getHours().padZero();
    hour12 = get12Hour(hour24).padZero();
    minute = dateTime.getMinutes().padZero();
    second = dateTime.getSeconds().padZero();
    period = Number(hour24) < 12 ? 'am' : 'pm';
    [elapsedTime, elapsedTimeInSeconds] = getElapsedTime(
      hour24,
      minute,
      second
    );
    quartile = getQuartileTime(dateTime, 'word');
    quartileInNumber = getQuartileTime(dateTime, 'number');
  } else if (typeof time === 'string' && clockTest.test(time)) {
    time = convertPeriod(time);
    [hour24, minute, second = '00'] = time.split(':');
    hour12 = get12Hour(hour24).padZero();
    period = Number(hour24) < 12 ? 'am' : 'pm';
    [elapsedTime, elapsedTimeInSeconds] = getElapsedTime(
      hour24,
      minute,
      second
    );
    quartile = getQuartileTime(hour24, minute, 'word');
    quartileInNumber = getQuartileTime(hour24, minute, 'number');
  } else {
    return result;
  }

  const bestFormat: Result = `${hour12}:${minute} ${period.toUpperCase()}`;

  if (format === 'hh:mm:ss') result = `${hour12}:${minute}:${second}`;
  if (format === 'hh:mm:ss p')
    result = `${hour12}:${minute}:${second} ${period}`;
  if (format === 'hh:mm:ss P')
    result = `${hour12}:${minute}:${second} ${period.toUpperCase()}`;
  if (format === 'hh:mm') result = `${hour12}:${minute}`;
  if (format === 'hh:mm p') result = `${hour12}:${minute} ${period}`;
  if (format === 'hh:mm P') result = bestFormat;
  if (format === 'HH:MM:SS') result = `${hour24}:${minute}:${second}`;
  if (format === 'HH:MM') result = `${hour24}:${minute}`;

  if (!elapsedTime || !elapsedTimeInSeconds) return result;
  if (format === 'elapsed') result = elapsedTime;
  if (format === 'elapsed-seconds') result = elapsedTimeInSeconds;

  if (format === 'quartile') result = quartile || bestFormat;
  if (format === 'quartile-number') result = quartileInNumber || bestFormat;

  return result;
}
