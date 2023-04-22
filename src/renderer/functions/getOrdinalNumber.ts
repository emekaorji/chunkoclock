/**
 * Converts a number to it's ordinal form
 * @param num The number to convert
 * @returns The ordinal representation of the number
 */

export default function getOrdinalNumber(num: number): string {
  const t = (n: number) => num % 10 === n;
  if (num < 1) return '';
  let suffix: string;
  if (t(1)) {
    suffix = 'st';
  } else if (t(2)) {
    suffix = 'nd';
  } else if (t(3)) {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }
  return num + suffix;
}
