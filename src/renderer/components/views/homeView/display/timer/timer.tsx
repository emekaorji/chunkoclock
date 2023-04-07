import TimeInput from 'renderer/components/interface/timeInput/timeInput';
import getClassName from 'renderer/functions/getClassName';
import useHomeViewContext from '../../hooks/useHomeViewContext';
import styles from './timer.module.css';

const Timer = () => {
  const {
    isFocused,
    menuIsOpen,
    timeUp,
    value,
    handleStart,
    handleFocus,
    handleHoursChange,
    handleMinutesChange,
    handleSecondsChange,
  } = useHomeViewContext();

  return (
    <>
      <div
        className={
          styles.timer +
          getClassName(timeUp, styles.timeUp) +
          getClassName(menuIsOpen, styles.menuIsOpen) +
          getClassName(!value.hours && !isFocused, styles.hoursHidden) +
          getClassName(
            !value.minutes && !value.hours && !isFocused,
            styles.minutesHidden
          )
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
          hidden={!value.minutes && !value.hours && !isFocused}
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
