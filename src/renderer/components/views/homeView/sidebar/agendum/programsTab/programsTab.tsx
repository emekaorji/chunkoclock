/* eslint-disable no-plusplus */
import SmallButton from 'renderer/components/interface/buttons/smallButton';
import PlusIcon from 'renderer/components/interface/icons/plus';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from 'react';
import getRandomTitle from 'renderer/functions/getRandomWord';
import useStore from 'renderer/hooks/data/useStore';
import styles from './programsTab.module.css';
import Program, { IProgram, TInputRef } from './program/program';

const ProgramsTab = () => {
  const [newProgramExist, setNewProgramExist] = useState(false);
  const [programs, setPrograms] = useStore<IProgram[]>('programs', []);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<TInputRef>(null);

  const handleAddProgram = () => {
    const scrollContainer = containerRef.current as HTMLDivElement;
    const { scrollHeight } = scrollContainer;
    const randomTitle = getRandomTitle();
    const newProgram: IProgram = {
      id: uuidv4(),
      title: randomTitle,
      placeholder: randomTitle,
      date: new Date().toISOString().slice(0, 10),
      theme: 'monotone',
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
      titleRef.current?.select();
    }, 1);
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms((prev) => prev.filter((program) => program.id !== id));
  };

  const handleUpdateProgram = (
    id: string,
    newProgram: (p: IProgram) => IProgram
  ) => {
    setPrograms((prev) => {
      const programIndex = prev.findIndex((item) => item.id === id);
      const program = prev.find((item) => item.id === id);
      if (!program) return prev;
      const updatedProgram = newProgram(program);
      prev.splice(programIndex, 1, updatedProgram);
      return [...prev];
    });
    setNewProgramExist(false);
  };

  return (
    <>
      <div className={styles.tab}>
        <div className={styles.programsContainer} ref={containerRef}>
          {programs.map((item, index, array) => (
            <Program
              key={item.id}
              isLast={index + 1 === array.length && newProgramExist}
              id={item.id}
              title={item.title}
              placeholder={item.placeholder}
              date={item.date}
              theme={item.theme}
              deleteProgram={handleDeleteProgram}
              updateProgram={handleUpdateProgram}
              ref={titleRef}
            />
          ))}
          {/* <div className={styles.anchor} /> */}
        </div>
        <SmallButton
          type="button"
          className={styles.addButton}
          onClick={handleAddProgram}
        >
          <PlusIcon />
        </SmallButton>
      </div>
    </>
  );
};

export default ProgramsTab;
