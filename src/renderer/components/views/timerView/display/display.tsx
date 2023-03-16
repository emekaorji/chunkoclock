import TimeInput from 'renderer/components/interface/timeInput/timeInput';
import getClassName from 'renderer/functions/getClassName';
import useTimerViewContext from '../hooks/useTimerViewContext';
import styles from './display.module.css';

const Display = () => {
  const {
    value,
    timeUp,
    handleStart,
    handlePause,
    handleHoursChange,
    handleMinutesChange,
    handleSecondsChange,
  } = useTimerViewContext();

  return (
    <>
      <div className={styles.display + getClassName(timeUp, styles.timeUp)}>
        {timeUp && '-'}
        <TimeInput
          name="hours"
          value={value.hours}
          onChange={handleHoursChange}
          onFocus={handlePause}
        />
        :
        <TimeInput
          name="minutes"
          value={value.minutes}
          onChange={handleMinutesChange}
          onFocus={handlePause}
        />
        :
        <TimeInput
          name="seconds"
          value={value.seconds}
          onChange={handleSecondsChange}
          onFocus={handlePause}
          onEnter={handleStart}
        />
      </div>
    </>
  );
};

export default Display;
