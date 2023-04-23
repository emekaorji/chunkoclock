import { RefObject } from 'react';
import { IProgram, TInputRef } from './programTypes';
import { ITimeSlot } from './timeSlotTypes';

export interface AgendumContextInterface {
  activeProgram: IProgram | null;
  programsTabRef: RefObject<HTMLDivElement>;
  programs: IProgram[];
  selectedProgram: IProgram | null;
  programTitleRef: RefObject<TInputRef>;
  timeSlotsTabRef: RefObject<HTMLDivElement>;
  timeSlotTitleRef: RefObject<TInputRef>;
  handleActivateProgram: (_id: string) => void;
  handleAddProgram: () => void;
  handleDeleteProgram: (_id: string) => void;
  handleSelectProgram: (_id: string) => void;
  handleUpdateProgram: (
    _id: string,
    _newProgram: (_program: IProgram) => IProgram
  ) => void;
  isLastProgram: (_index: number, _array: IProgram[]) => boolean;
  isLastTimeSlot: (_index: number, _array: ITimeSlot[]) => boolean;
}
