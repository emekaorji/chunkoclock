import { TimeValueType } from 'renderer/types/timeTypes';

export default function getValueFromTime(seconds: number): TimeValueType {
  return {
    hours: Math.floor(Math.abs(seconds / 60 / 60)),
    minutes: Math.floor(Math.abs((seconds / 60) % 60)),
    seconds: Math.abs(seconds % 60),
  };
}
