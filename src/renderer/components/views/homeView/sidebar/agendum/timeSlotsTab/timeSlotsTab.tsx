/* eslint-disable no-plusplus */
import SmallButton from 'renderer/components/interface/buttons/smallButton';
import PlusIcon from 'renderer/components/interface/icons/plus';
import getClassName from 'renderer/functions/getClassName';
import getRandomTitle from 'renderer/functions/getRandomWord';
import { v4 as uuidv4 } from 'uuid';
import CancelIcon from 'renderer/components/interface/icons/cancel';
import ThemeInput from 'renderer/components/interface/themeInput/themeInput';
import styles from './timeSlotsTab.module.css';
import useAgendumContext from '../hooks/useAgendumContext';
import TimeSlot from './timeSlot/timeSlot';
import { ITimeSlot } from '../types/timeSlotTypes';

const getTimeSlots = (num: number) => {
  const arr: ITimeSlot[] = [];
  for (let i = 0; i < num; i++) {
    const randomTitle = getRandomTitle();
    arr.push({
      id: uuidv4(),
      title: randomTitle,
      placeholder: randomTitle,
      description: '',
      start: '',
      end: '',
      speaker: '',
    });
  }
  return arr;
};

const TIME_SLOTS = getTimeSlots(1);

const TimeSlotsTab = () => {
  const {
    timeSlots,
    timeSlotsTabRef,
    timeSlotTitleRef,
    selectedProgram,
    isLastTimeSlot,
    handleAddTimeSlot,
  } = useAgendumContext();

  return (
    <>
      <div
        className={
          styles.tab + getClassName(!!selectedProgram, styles.programSelected)
        }
      >
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <div className={styles.title}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {}}
              >
                <CancelIcon />
              </button>
              <div className={styles.titleText}>{selectedProgram?.title}</div>
            </div>
            <div className={styles.description}>
              {selectedProgram?.description}
            </div>
          </div>
          <ThemeInput value={selectedProgram?.theme || 'monotone'} disabled />
        </div>
        <div className={styles.timeSlotsContainer} ref={timeSlotsTabRef}>
          {timeSlots.map((item, index, array) => (
            <TimeSlot
              key={item.id}
              id={item.id}
              title={item.title}
              placeholder={item.placeholder}
              description={item.description}
              start={item.start}
              end={item.end}
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
