import { ChangeEventProp } from 'renderer/types/eventTypes';
import { TimeValueType } from 'renderer/types/timeTypes';

export interface TimerViewContextInterface {
  value: TimeValueType;
  timeUp: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  handleStart: () => void;
  handlePause: () => void;
  handleHoursChange: (event: ChangeEventProp) => void;
  handleMinutesChange: (event: ChangeEventProp) => void;
  handleSecondsChange: (event: ChangeEventProp) => void;
}
