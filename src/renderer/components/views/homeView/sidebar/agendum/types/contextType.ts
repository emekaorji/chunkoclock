import { RefObject } from 'react';
import { IProgram, TInputRef } from './programTypes';
import { ITimeSlot } from './timeSlotTypes';

export interface AgendumContextInterface {
  activeProgram: IProgram | null;
  programsTabRef: RefObject<HTMLDivElement>;
  programs: IProgram[];
  selectedProgram: IProgram | null;
  programTitleRef: RefObject<TInputRef>;
  timeSlots: ITimeSlot[];
  timeSlotsTabRef: RefObject<HTMLDivElement>;
  timeSlotTitleRef: RefObject<TInputRef>;
  handleActivateProgram: (_id: string) => void;
  handleAddProgram: () => void;
  handleAddTimeSlot: () => void;
  handleCloseProgram: () => void;
  handleDeleteProgram: (_id: string) => void;
  handleDeleteTimeSlot: (_id: string) => void;
  handleSelectProgram: (_id: string) => void;
  handleUpdateProgram: (
    _id: string,
    _newProgram: (_program: IProgram) => IProgram
  ) => void;
  handleUpdateTimeSlot: (
    _id: string,
    _newTimeSlot: (_timeSlot: ITimeSlot) => ITimeSlot
  ) => void;
  isLastProgram: (_index: number, _array: IProgram[]) => boolean;
  isLastTimeSlot: (_index: number, _array: ITimeSlot[]) => boolean;
}
