import { ChangeEventProp } from 'renderer/types/eventTypes';
import { timeValueType } from 'renderer/types/timeTypes';

export interface TimerViewContextInterface {
  value: timeValueType;
  timeUp: boolean;
  handleStart: () => void;
  handlePause: () => void;
  handleHoursChange: (event: ChangeEventProp) => void;
  handleMinutesChange: (event: ChangeEventProp) => void;
  handleSecondsChange: (event: ChangeEventProp) => void;
}
