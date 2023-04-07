import { ChangeEventProp } from 'renderer/types/eventTypes';
import { TimeSlot } from 'renderer/types/storeTypes';
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
  handleHoursChange: (event: ChangeEventProp) => void;
  handleMinutesChange: (event: ChangeEventProp) => void;
  handlePause: () => void;
  handleRestart: () => void;
  handleSecondsChange: (event: ChangeEventProp) => void;
  handleStart: () => void;
  toggleSidebar: () => void;
  updateAgendum: (timeSlot: TimeSlot) => void;
}
