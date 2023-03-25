import TimeInput from 'renderer/components/interface/timeInput/timeInput';
import getClassName from 'renderer/functions/getClassName';
import useTimerViewContext from '../hooks/useTimerViewContext';
import styles from './display.module.css';

const Display = () => {
  const {
    isFocused,
    value,
    timeUp,
    handleStart,
    handleBlur,
    handleFocus,
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
          onBlur={handleBlur}
          onChange={handleHoursChange}
          onFocus={handleFocus}
          className={getClassName(!value.hours && !isFocused, styles.hidden)}
        />
        <span
          className={getClassName(!value.hours && !isFocused, styles.hidden)}
        >
          :
        </span>
        <TimeInput
          name="minutes"
          value={value.minutes}
          onBlur={handleBlur}
          onChange={handleMinutesChange}
          onFocus={handleFocus}
          className={getClassName(!value.minutes && !isFocused, styles.hidden)}
        />
        <span
          className={getClassName(!value.minutes && !isFocused, styles.hidden)}
        >
          :
        </span>
        <TimeInput
          name="seconds"
          value={value.seconds}
          onBlur={handleBlur}
          onChange={handleSecondsChange}
          onEnter={handleStart}
          onFocus={handleFocus}
        />
      </div>
    </>
  );
};

export default Display;
