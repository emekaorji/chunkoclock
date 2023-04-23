import { Theme } from 'renderer/components/interface/themeInput/themeInput';
import { ITimeSlot } from './timeSlotTypes';

export interface IProgram {
  readonly id: string;
  title: string;
  placeholder: string;
  description: string;
  date: string;
  theme: Theme;
  timeSlots: ITimeSlot[];
}
export type TInputRef = { select: () => void };
