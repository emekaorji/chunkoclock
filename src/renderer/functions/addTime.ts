export default function addTime(time24Hr: string | undefined, minutes: number) {
  if (!time24Hr) return;
  if (!/^((0|1)?[0-9]|2[0-3]):[0-5]\d?$/.test(time24Hr)) return time24Hr;
  const date = new Date();
  const [hrs, mins] = time24Hr.split(':');
  date.setHours(Number(hrs), Number(mins));
  date.setMinutes(date.getMinutes() + minutes);
  return date.toLocaleTimeString().substring(0, 5);
}
