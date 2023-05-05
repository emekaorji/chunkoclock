import SmallButton from 'renderer/components/interface/buttons/smallButton';
import PlusIcon from 'renderer/components/interface/icons/plus';
import styles from './programsTab.module.css';
import Program from './program/program';
import useAgendumContext from '../hooks/useAgendumContext';

const ProgramsTab = () => {
  const {
    programTitleRef,
    programsTabRef,
    programs,
    isLastProgram,
    handleAddProgram,
  } = useAgendumContext();

  return (
    <>
      <div className={styles.tab}>
        <div className={styles.programsContainer} ref={programsTabRef}>
          {programs.map((item, index, array) => (
            <Program
              key={item.id}
              isLast={isLastProgram(index, array)}
              id={item.id}
              title={item.title}
              placeholder={item.placeholder}
              description={item.description}
              date={item.date}
              theme={item.theme}
              ref={programTitleRef}
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
