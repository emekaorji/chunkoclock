import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import getRemainingSeconds from 'renderer/functions/getRemainingSeconds';
import getTimeFromValue from 'renderer/functions/getTimeFromValue';
import getValueFromTime from 'renderer/functions/getValueFromTime';
import isValidTime from 'renderer/functions/isValidTime';
import useStore from 'renderer/hooks/useStore';
import { ChangeEventProp } from 'renderer/types/eventTypes';
import { StoreStateType } from 'renderer/types/storeTypes';
import { TimeValueType } from 'renderer/types/timeTypes';
import { TimerViewContextInterface } from '../types/contextType';

type TimerViewProviderProps = {
  children: JSX.Element;
};

const DEFAULT_TIME_VALUE: TimeValueType = { hours: 0, minutes: 0, seconds: 5 };

const TimerViewContext = createContext<TimerViewContextInterface | null>(null);

const TimerViewProvider = ({ children }: TimerViewProviderProps) => {
  const [storeTime, setStoreTime] = useStore<StoreStateType>('timer', {
    timeInSeconds: 5,
    time: null,
    timeUpAck: false,
  });
  const [value, setValue] = useState(DEFAULT_TIME_VALUE);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const intervalId = useRef<number | undefined>(undefined);

  const isPaused = useMemo(() => {
    return !isPlaying;
  }, [isPlaying]);

  const updateValue = useCallback(
    (time: number) => {
      const remainingSeconds = getRemainingSeconds(time);
      const newValue = getValueFromTime(remainingSeconds);
      setValue(newValue);
      if (remainingSeconds < 1 && !storeTime.timeUpAck) {
        setTimeUp(true);
        setStoreTime((prev) => ({ ...prev, time: null, timeUpAck: true }));
      }
    },
    [setStoreTime, storeTime.timeUpAck]
  );
  const start = useCallback(
    (dateTime: number) => {
      setIsPlaying(true);
      updateValue(dateTime);
      intervalId.current = window.setInterval(() => {
        updateValue(dateTime);
      }, 1000);
    },
    [updateValue]
  );
  const handleTimerOnMount = useCallback(() => {
    if (storeTime.time && isValidTime(storeTime.time)) {
      const remainingSeconds = getRemainingSeconds(storeTime.time);
      if (remainingSeconds < 1 && !storeTime.timeUpAck) {
        setTimeUp(true);
        setStoreTime((prev) => ({ ...prev, time: null, timeUpAck: true }));
      }
      start(storeTime.time);
    }
  }, [setStoreTime, start, storeTime.time, storeTime.timeUpAck]);
  useEffect(() => {
    handleTimerOnMount();
  }, [handleTimerOnMount]);

  // User driven functions
  const handleStart = useCallback(() => {
    const dateTime = getTimeFromValue(value);
    const seconds = getRemainingSeconds(dateTime);

    start(dateTime);
    if (!storeTime.timeInSeconds) {
      setStoreTime({
        timeInSeconds: seconds,
        time: dateTime,
        timeUpAck: false,
      });
    } else {
      setStoreTime((prev) => ({
        ...prev,
        time: dateTime,
        timeUpAck: false,
      }));
    }
  }, [setStoreTime, start, storeTime.timeInSeconds, value]);
  const handlePause = useCallback(() => {
    console.log(intervalId.current);
    window.clearInterval(intervalId.current);
  }, []);
  const handleHoursChange = useCallback((event: ChangeEventProp) => {
    const intValue = parseInt(event.target.value, 10);
    setValue((prev) => ({ ...prev, hours: intValue }));
  }, []);
  const handleMinutesChange = useCallback((event: ChangeEventProp) => {
    const intValue = parseInt(event.target.value, 10);
    setValue((prev) => ({ ...prev, minutes: intValue }));
  }, []);
  const handleSecondsChange = useCallback((event: ChangeEventProp) => {
    const intValue = parseInt(event.target.value, 10);
    setValue((prev) => ({ ...prev, seconds: intValue }));
  }, []);

  const providerValue = useMemo(
    () => ({
      value,
      timeUp,
      isPlaying,
      isPaused,
      handleStart,
      handlePause,
      handleHoursChange,
      handleMinutesChange,
      handleSecondsChange,
    }),
    [
      value,
      timeUp,
      isPlaying,
      isPaused,
      handleHoursChange,
      handleMinutesChange,
      handlePause,
      handleSecondsChange,
      handleStart,
    ]
  );

  return (
    <TimerViewContext.Provider value={providerValue}>
      {children}
    </TimerViewContext.Provider>
  );
};

export { TimerViewContext };
export default TimerViewProvider;
