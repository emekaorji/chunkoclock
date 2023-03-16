import { timeValueType } from 'renderer/types/timeTypes';

export default function getTimeFromValue(value: timeValueType): number {
  const hoursInSeconds = value.hours * 60 * 60;
  const minuteInSeconds = value.minutes * 60;
  const secondsInSeconds = value.seconds;
  const total = hoursInSeconds + minuteInSeconds + secondsInSeconds;

  const currentTime = new Date();
  const currentSeconds = currentTime.getSeconds();

  currentTime.setSeconds(currentSeconds + total);

  return currentTime.getTime();
}
