import React, { useCallback, useEffect, useRef, useState } from 'react';
import TimeInput from 'renderer/components/interface/timeInput/timeInput';
import getClassName from 'renderer/functions/getClassName';
import useStore from 'renderer/hooks/useStore';
import styles from './digital.module.css';

// type DigitalProps = {};
type eventProp = React.ChangeEvent<HTMLInputElement>;
type timeValueType = {
  hours: number;
  minutes: number;
  seconds: number;
};

const getTime = (
  type: 'seconds' | 'minutes' | 'hours',
  value: number
): number => {
  const currentTime = new Date();
  const currentSeconds = currentTime.getSeconds();

  if (type === 'seconds') {
    currentTime.setSeconds(currentSeconds + value);
  }
  if (type === 'minutes') {
    currentTime.setSeconds(currentSeconds + value * 60);
  }
  if (type === 'hours') {
    currentTime.setSeconds(currentSeconds + value * 60 * 60);
  }

  return currentTime.getTime();
};

const getRemainingSeconds = (futureTime: number): number => {
  const remainingSeconds =
    new Date(futureTime).getTime() - new Date().getTime();
  return Math.round(remainingSeconds / 1000);
};

const getValue = (seconds: number): timeValueType => {
  return {
    hours: Math.floor(seconds / 60 / 60),
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
  };
};

const isValidTime = (time: number): boolean => {
  return !!new Date(time).getTime();
};

const DEFAULT_TIME_VALUE: timeValueType = { hours: 0, minutes: 10, seconds: 0 };

const Digital = () => {
  const [storeTime, setStoreTime] = useStore<number>('timer');
  const [value, setValue] = useState(DEFAULT_TIME_VALUE);
  const [timeUp, setTimeUp] = useState(false);
  const intervalId = useRef<number | undefined>(undefined);

  const start = useCallback(
    (timeValue: { hours: number; minutes: number; seconds: number }) => {
      const hoursInSeconds = timeValue.hours * 60 * 60;
      const minuteInSeconds = timeValue.minutes * 60;
      const secondsInSeconds = timeValue.seconds;
      const total = hoursInSeconds + minuteInSeconds + secondsInSeconds;
      const time = getTime('seconds', total);
      intervalId.current = window.setInterval(() => {
        const remainingSeconds = getRemainingSeconds(time);
        const seconds = remainingSeconds > 0 ? remainingSeconds : 0;
        const newValue = getValue(seconds);
        setValue(newValue);
        console.log(seconds);
        if (seconds < 1) {
          setTimeUp(true);
          clearInterval(intervalId.current);
        }
      }, 1000);

      return time;
    },
    []
  );

  const handleStart = useCallback(
    (timeValue: { hours: number; minutes: number; seconds: number }) => {
      const time = start(timeValue);
      setStoreTime(time);
    },
    [setStoreTime, start]
  );

  useEffect(() => {
    if (storeTime && isValidTime(storeTime)) {
      const seconds = getRemainingSeconds(storeTime);
      const timeValue = getValue(seconds);
      start(timeValue);
    }
  }, [start, storeTime]);

  const handlePause = () => {
    clearInterval(intervalId.current);
  };

  const handleStop = () => {
    clearInterval(intervalId.current);
  };

  const handleHoursChange = (event: eventProp) => {
    const intValue = parseInt(event.target.value, 10);
    setValue((prev) => ({ ...prev, hours: intValue }));
  };

  const handleMinutesChange = (event: eventProp) => {
    const intValue = parseInt(event.target.value, 10);
    setValue((prev) => ({ ...prev, minutes: intValue }));
  };

  const handleSecondsChange = (event: eventProp) => {
    const intValue = parseInt(event.target.value, 10);
    setValue((prev) => ({ ...prev, seconds: intValue }));
  };

  return (
    <>
      <div className={styles.digital + getClassName(timeUp, styles.timeUp)}>
        <TimeInput
          value={value.hours}
          onChange={handleHoursChange}
          onFocus={handlePause}
        />
        :
        <TimeInput
          value={value.minutes}
          onChange={handleMinutesChange}
          onFocus={handlePause}
        />
        :
        <TimeInput
          value={value.seconds}
          onChange={handleSecondsChange}
          onFocus={handlePause}
        />
      </div>
      <button onClick={() => handleStart(value)} type="button">
        Start
      </button>
      <button onClick={handlePause} type="button">
        Stop
      </button>
    </>
  );
};

export default Digital;
