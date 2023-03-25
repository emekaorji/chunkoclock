import { ChangeEventProp } from 'renderer/types/eventTypes';
import { TimeValueType } from 'renderer/types/timeTypes';

export interface TimerViewContextInterface {
  isFocused: boolean;
  isPaused: boolean;
  isPlaying: boolean;
  timeUp: boolean;
  timeUpAck: boolean;
  value: TimeValueType;
  handleBlur: () => void;
  handleFocus: () => void;
  handleHoursChange: (event: ChangeEventProp) => void;
  handleMinutesChange: (event: ChangeEventProp) => void;
  handlePause: () => void;
  handleRestart: () => void;
  handleSecondsChange: (event: ChangeEventProp) => void;
  handleStart: () => void;
}
