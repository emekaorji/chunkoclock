import { ChangeEventProp } from 'renderer/types/eventTypes';
import { TimeValueType } from 'renderer/types/timeTypes';

export interface HomeViewContextInterface {
  isFocused: boolean;
  isPaused: boolean;
  isPlaying: boolean;
  menuIsOpen: boolean;
  timeUp: boolean;
  timeUpAck: boolean;
  value: TimeValueType;
  handleFocus: () => void;
  handleHoursChange: (_event: ChangeEventProp) => void;
  handleMinutesChange: (_event: ChangeEventProp) => void;
  handlePause: () => void;
  handleRestart: () => void;
  handleSecondsChange: (_event: ChangeEventProp) => void;
  handleStart: () => void;
  toggleSidebar: () => void;
}
