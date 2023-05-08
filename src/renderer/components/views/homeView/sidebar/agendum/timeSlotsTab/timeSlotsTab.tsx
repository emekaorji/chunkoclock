/* eslint-disable no-plusplus */
import SmallButton from 'renderer/components/interface/buttons/smallButton';
import PlusIcon from 'renderer/components/interface/icons/plus';
import getClassName from 'renderer/functions/getClassName';
import styles from './timeSlotsTab.module.css';
import useAgendumContext from '../hooks/useAgendumContext';
import TimeSlot from './timeSlot/timeSlot';
import ProgramDetails from './programDetails/programDetails';

const TimeSlotsTab = () => {
  const {
    timeSlots,
    timeSlotsTabRef,
    timeSlotTitleRef,
    selectedProgram,
    isLastTimeSlot,
    handleAddTimeSlot,
  } = useAgendumContext();

  // console.log(timeSlots);

  return (
    <>
      <div
        className={
          styles.tab + getClassName(!!selectedProgram, styles.programSelected)
        }
      >
        {selectedProgram && (
          <ProgramDetails
            id={selectedProgram.id}
            title={selectedProgram.title}
            theme={selectedProgram.theme}
            date={selectedProgram.date}
            description={selectedProgram.description}
            buttonStyle={styles.buttons}
          />
        )}
        <div className={styles.timeSlotsContainer} ref={timeSlotsTabRef}>
          {timeSlots.map((item, index, array) => (
            <TimeSlot
              key={item.id}
              id={item.id}
              title={item.title}
              placeholder={item.placeholder}
              description={item.description}
              speaker={item.speaker}
              start={item.start}
              end={item.end}
              overlap={item.overlap}
              prevTimeSlot={array[index - 1]}
              isLast={isLastTimeSlot(index, array)}
              ref={timeSlotTitleRef}
            />
          ))}
        </div>
        <SmallButton className={styles.addButton} onClick={handleAddTimeSlot}>
          <PlusIcon />
        </SmallButton>
      </div>
    </>
  );
};

export default TimeSlotsTab;
