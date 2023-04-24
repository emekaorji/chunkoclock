/* eslint-disable no-plusplus */
import SmallButton from 'renderer/components/interface/buttons/smallButton';
import PlusIcon from 'renderer/components/interface/icons/plus';
import getClassName from 'renderer/functions/getClassName';
import getRandomTitle from 'renderer/functions/getRandomWord';
import { v4 as uuidv4 } from 'uuid';
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
  const { timeSlotsTabRef, timeSlotTitleRef, selectedProgram, isLastTimeSlot } =
    useAgendumContext();

  return (
    <>
      <div
        className={
          styles.tab + getClassName(!!selectedProgram, styles.programSelected)
        }
      >
        <div className={styles.timeSlotsContainer} ref={timeSlotsTabRef}>
          {TIME_SLOTS.map((item, index, array) => (
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
          {/* <div className={styles.anchor} /> */}
        </div>
        <SmallButton type="button" className={styles.addButton}>
          <PlusIcon />
        </SmallButton>
      </div>
    </>
  );
};

export default TimeSlotsTab;
