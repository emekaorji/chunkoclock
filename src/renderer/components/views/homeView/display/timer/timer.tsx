import TimeInput from 'renderer/components/interface/timeInput/timeInput';
import getClassName from 'renderer/functions/getClassName';
import useTimerViewContext from '../../hooks/useTimerViewContext';
import styles from './timer.module.css';

const Timer = () => {
  const {
    isFocused,
    value,
    timeUp,
    handleStart,
    handleFocus,
    handleHoursChange,
    handleMinutesChange,
    handleSecondsChange,
  } = useTimerViewContext();

  return (
    <>
      <div
        className={
          styles.timer +
          getClassName(timeUp, styles.timeUp) +
          getClassName(!value.hours && !isFocused, styles.hoursHidden) +
          getClassName(!value.minutes && !isFocused, styles.minutesHidden)
        }
      >
        {timeUp && '-'}
        <TimeInput
          name="hours"
          value={value.hours}
          onChange={handleHoursChange}
          onFocus={handleFocus}
          hidden={!value.hours && !isFocused}
          hasColon
        />
        <TimeInput
          name="minutes"
          value={value.minutes}
          onChange={handleMinutesChange}
          onFocus={handleFocus}
          hidden={!value.minutes && !isFocused}
          hasColon
        />
        <TimeInput
          name="seconds"
          value={value.seconds}
          onChange={handleSecondsChange}
          onEnter={handleStart}
          onFocus={handleFocus}
        />
      </div>
    </>
  );
};

export default Timer;
