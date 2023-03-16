export default function isValidTime(time: number): boolean {
  return !!new Date(time).getTime();
}
