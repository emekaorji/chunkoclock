import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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

const getTimeFromValue = (value: timeValueType): number => {
  const hoursInSeconds = value.hours * 60 * 60;
  const minuteInSeconds = value.minutes * 60;
  const secondsInSeconds = value.seconds;
  const total = hoursInSeconds + minuteInSeconds + secondsInSeconds;

  const currentTime = new Date();
  const currentSeconds = currentTime.getSeconds();

  currentTime.setSeconds(currentSeconds + total);

  return currentTime.getTime();
};

const getRemainingSeconds = (futureTime: number): number => {
  const remainingSeconds =
    new Date(futureTime).getTime() - new Date().getTime();
  return Math.round(remainingSeconds / 1000);
};

const getValueFromTime = (seconds: number): timeValueType => {
  let timeValue;
  if (seconds > 0) {
    timeValue = {
      hours: Math.abs(Math.floor(seconds / 60 / 60)),
      minutes: Math.abs(Math.floor(seconds / 60) % 60),
      seconds: Math.abs(seconds % 60),
    };
  } else {
    timeValue = {
      hours: Math.abs(Math.ceil(seconds / 60 / 60)),
      minutes: Math.abs(Math.ceil(seconds / 60) % 60),
      seconds: Math.abs(seconds % 60),
    };
  }
  return timeValue;
};

const isValidTime = (time: number): boolean => {
  return !!new Date(time).getTime();
};

const DEFAULT_TIME_VALUE: timeValueType = { hours: 0, minutes: 10, seconds: 0 };

const Digital = () => {
  const [storeTime, setStoreTime] = useStore<{
    // seconds: number;
    time: number | null;
    timeUpAck: boolean;
  }>('timer');
  const [value, setValue] = useState(DEFAULT_TIME_VALUE);
  const [timeUp, setTimeUp] = useState(false);
  const intervalId = useRef<number | undefined>(undefined);

  // const timeUpColor = useMemo(() => {
  //   const dateTime = getTimeFromValue(value);
  //   const remainingSeconds = getRemainingSeconds(dateTime);
  //   let gb = 255;
  //   if (remainingSeconds < 8) {
  //     gb = 35 * remainingSeconds;
  //   }

  //   const color = `rgb(255, ${gb}, ${gb})`;

  //   return color;
  // }, [value]);

  const updateValue = useCallback(
    (time: number) => {
      const remainingSeconds = getRemainingSeconds(time);
      const newValue = getValueFromTime(remainingSeconds);
      setValue(newValue);
      if (remainingSeconds < 1) {
        setTimeUp(true);
        setStoreTime({ time: null, timeUpAck: true });
      }
    },
    [setStoreTime]
  );

  const start = useCallback(
    (timeValue: timeValueType) => {
      // dateTime e.g 1678797543131
      const dateTime = getTimeFromValue(timeValue);
      updateValue(dateTime);
      intervalId.current = window.setInterval(() => {
        updateValue(dateTime);
      }, 1000);

      return dateTime;
    },
    [updateValue]
  );

  const handleTimeOnMount = useCallback(() => {
    if (storeTime.time && isValidTime(storeTime.time)) {
      const seconds = getRemainingSeconds(storeTime.time);
      const timeValue = getValueFromTime(seconds);
      start(timeValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  useEffect(() => {
    handleTimeOnMount();
  }, [handleTimeOnMount]);

  // User driven functions
  const handleStart = useCallback(() => {
    const time = start(value);
    setStoreTime({ time, timeUpAck: false });
  }, [setStoreTime, start, value]);
  const handlePause = useCallback(() => {
    window.clearInterval(intervalId.current);
  }, []);
  const handleHoursChange = useCallback((event: eventProp) => {
    const intValue = parseInt(event.target.value, 10);
    setValue((prev) => ({ ...prev, hours: intValue }));
  }, []);
  const handleMinutesChange = useCallback((event: eventProp) => {
    const intValue = parseInt(event.target.value, 10);
    setValue((prev) => ({ ...prev, minutes: intValue }));
  }, []);
  const handleSecondsChange = useCallback((event: eventProp) => {
    const intValue = parseInt(event.target.value, 10);
    setValue((prev) => ({ ...prev, seconds: intValue }));
  }, []);

  return (
    <>
      <div className={styles.digital + getClassName(timeUp, styles.timeUp)}>
        {timeUp && '-'}
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
      <button onClick={handleStart} type="button">
        Start
      </button>
      <button onClick={handlePause} type="button">
        Stop
      </button>
    </>
  );
};

export default Digital;
