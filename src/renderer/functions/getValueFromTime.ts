import { timeValueType } from 'renderer/types/timeTypes';

export default function getValueFromTime(seconds: number): timeValueType {
  return {
    hours: Math.floor(Math.abs(seconds / 60 / 60)),
    minutes: Math.floor(Math.abs((seconds / 60) % 60)),
    seconds: Math.abs(seconds % 60),
  };
}
