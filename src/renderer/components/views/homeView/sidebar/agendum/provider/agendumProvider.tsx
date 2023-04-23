import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getRandomTitle from 'renderer/functions/getRandomWord';
import useStore from 'renderer/hooks/data/useStore';
import { AgendumContextInterface } from '../types/contextType';
import { IProgram, TInputRef } from '../types/programTypes';
import { ITimeSlot } from '../types/timeSlotTypes';

type AgendumProviderProps = {
  children: JSX.Element;
};

const AgendumContext = createContext<AgendumContextInterface | null>(null);

const AgendumProvider = ({ children }: AgendumProviderProps) => {
  const [newProgramExist, setNewProgramExist] = useState(false);
  const [newTimeSlotExist, setNewTimeSlotExist] = useState(false);
  const [activeProgram, setActiveProgram] = useState<IProgram | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<IProgram | null>(null);
  const [programs, setPrograms] = useStore<IProgram[]>('programs', []);
  const programsTabRef = useRef<HTMLDivElement>(null);
  const programTitleRef = useRef<TInputRef>(null);
  const timeSlotsTabRef = useRef<HTMLDivElement>(null);
  const timeSlotTitleRef = useRef<TInputRef>(null);

  const isLastProgram = useCallback(
    (index: number, array: IProgram[]) => {
      return index + 1 === array.length && newProgramExist;
    },
    [newProgramExist]
  );

  const isLastTimeSlot = useCallback(
    (index: number, array: ITimeSlot[]) => {
      return index + 1 === array.length && newTimeSlotExist;
    },
    [newTimeSlotExist]
  );

  const handleAddProgram = useCallback(() => {
    const scrollContainer = programsTabRef.current as HTMLDivElement;
    const { scrollHeight } = scrollContainer;
    const randomTitle = getRandomTitle();
    const newProgram: IProgram = {
      id: uuidv4(),
      title: randomTitle,
      placeholder: randomTitle,
      date: new Date().toISOString().slice(0, 10),
      theme: 'monotone',
      description: '',
      timeSlots: [],
    };
    setPrograms((prev) => {
      prev.push(newProgram);
      return [...prev];
    });
    setNewProgramExist(true);
    setTimeout(() => {
      scrollContainer.scrollTo({
        left: 0,
        top: scrollHeight,
        behavior: 'smooth',
      });
      programTitleRef.current?.select();
    }, 1);
  }, [setPrograms]);

  const handleDeleteProgram = useCallback(
    (id: string) => {
      setPrograms((prev) => prev.filter((program) => program.id !== id));
    },
    [setPrograms]
  );

  const handleUpdateProgram = useCallback(
    (id: string, newProgram: (_program: IProgram) => IProgram) => {
      setPrograms((prev) => {
        const programIndex = prev.findIndex((item) => item.id === id);
        const program = prev.find((item) => item.id === id);
        if (!program) return prev;
        const updatedProgram = newProgram(program);
        prev.splice(programIndex, 1, updatedProgram);
        return [...prev];
      });
      setNewProgramExist(false);
    },
    [setPrograms]
  );

  const handleSelectProgram = useCallback(
    (id: string) => {
      const clickedProgram = programs.find((program) => program.id === id);
      if (!clickedProgram) return;
      setSelectedProgram(clickedProgram);
    },
    [programs]
  );

  const handleActivateProgram = useCallback(
    (id: string) => {
      const runningProgram = programs.find((program) => program.id === id);
      if (!runningProgram) return;
      setActiveProgram(runningProgram);
    },
    [programs]
  );

  const providerValue = useMemo<AgendumContextInterface>(
    () => ({
      activeProgram,
      selectedProgram,
      programsTabRef,
      programs,
      programTitleRef,
      timeSlotsTabRef,
      timeSlotTitleRef,
      handleActivateProgram,
      handleAddProgram,
      handleDeleteProgram,
      handleSelectProgram,
      handleUpdateProgram,
      isLastProgram,
      isLastTimeSlot,
    }),
    [
      activeProgram,
      selectedProgram,
      programs,
      handleActivateProgram,
      handleAddProgram,
      handleDeleteProgram,
      handleSelectProgram,
      handleUpdateProgram,
      isLastProgram,
      isLastTimeSlot,
    ]
  );

  return (
    <AgendumContext.Provider value={providerValue}>
      {children}
    </AgendumContext.Provider>
  );
};

export { AgendumContext };
export default AgendumProvider;
