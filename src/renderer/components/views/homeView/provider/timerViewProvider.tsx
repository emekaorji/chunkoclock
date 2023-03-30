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
import useStore from 'renderer/hooks/data/useStore';
import { ChangeEventProp } from 'renderer/types/eventTypes';
import { StoreStateType } from 'renderer/types/storeTypes';
import { TimerViewContextInterface } from '../types/contextType';

type TimerViewProviderProps = {
  children: JSX.Element;
};

const DEFAULT_TIME_IN_SECONDS = 60;

const TimerViewContext = createContext<TimerViewContextInterface | null>(null);

const TimerViewProvider = ({ children }: TimerViewProviderProps) => {
  const [storeTime, setStoreTime] = useStore<StoreStateType>('timer', {
    timeInSeconds: DEFAULT_TIME_IN_SECONDS,
    time: null,
  });
  const [value, setValue] = useState(getValueFromTime(DEFAULT_TIME_IN_SECONDS));
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const intervalId = useRef<number | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);

  const timeUpAck = useMemo(() => {
    return storeTime.time === null;
  }, [storeTime.time]);
  const isPaused = useMemo(() => {
    return !isPlaying;
  }, [isPlaying]);

  const updateValue = useCallback(
    (time: number) => {
      const remainingSeconds = getRemainingSeconds(time);
      const newValue = getValueFromTime(remainingSeconds);
      setValue(newValue);
      if (remainingSeconds < 1 && !timeUpAck) {
        setTimeUp(true);
        setStoreTime((prev) => ({ ...prev, time: null }));
      }
    },
    [setStoreTime, timeUpAck]
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

  useEffect(() => {
    if (storeTime.time && isValidTime(storeTime.time)) {
      start(storeTime.time);
    }
  }, [start, storeTime.time]);

  // Button Events
  const handleStart = useCallback(() => {
    setIsFocused(false);
    const dateTime = getTimeFromValue(value);
    const seconds = getRemainingSeconds(dateTime);

    if (!storeTime.time) {
      setStoreTime({
        timeInSeconds: seconds,
        time: dateTime,
      });
    } else {
      setStoreTime((prev) => ({
        ...prev,
        time: dateTime,
      }));
    }
  }, [setStoreTime, storeTime.time, value]);
  const handlePause = useCallback(() => {
    window.clearInterval(intervalId.current);
    setIsPlaying(false);
  }, []);
  const handleRestart = useCallback(() => {
    handlePause();
    setTimeUp(false);
    setValue(getValueFromTime(storeTime.timeInSeconds));
    setStoreTime({ timeInSeconds: DEFAULT_TIME_IN_SECONDS, time: null });
  }, [handlePause, setStoreTime, storeTime.timeInSeconds]);

  // Input Events
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (timeUp) {
      handleRestart();
      return;
    }
    handlePause();
  }, [handlePause, handleRestart, timeUp]);
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
      isFocused,
      isPaused,
      isPlaying,
      timeUp,
      timeUpAck,
      value,
      handleFocus,
      handleHoursChange,
      handleMinutesChange,
      handlePause,
      handleRestart,
      handleSecondsChange,
      handleStart,
    }),
    [
      isFocused,
      isPaused,
      isPlaying,
      timeUp,
      timeUpAck,
      value,
      handleFocus,
      handleHoursChange,
      handleMinutesChange,
      handlePause,
      handleRestart,
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
