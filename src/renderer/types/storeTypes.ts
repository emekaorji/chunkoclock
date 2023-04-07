import { TimeValueType } from './timeTypes';

export type StoreStateType = {
  timeInSeconds: number;
  time: number | null;
};
export interface TimeSlot {
  title: string;
  value: TimeValueType;
}
