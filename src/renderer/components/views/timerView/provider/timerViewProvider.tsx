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
import { timeValueType } from 'renderer/types/timeTypes';
import { TimerViewContextInterface } from '../types/contextType';

type TimerViewProviderProps = {
  children: JSX.Element;
};

const DEFAULT_TIME_VALUE: timeValueType = { hours: 0, minutes: 10, seconds: 0 };

const TimerViewContext = createContext<TimerViewContextInterface | null>(null);

const TimerViewProvider = ({ children }: TimerViewProviderProps) => {
  const [storeTime, setStoreTime] = useStore<{
    // timeInSeconds: number;
    time: number | null;
    timeUpAck: boolean;
  }>('timer');
  const [value, setValue] = useState(DEFAULT_TIME_VALUE);
  const [timeUp, setTimeUp] = useState(false);
  const intervalId = useRef<number | undefined>(undefined);

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

  const handleTimerOnMount = useCallback(() => {
    if (storeTime.time && isValidTime(storeTime.time)) {
      const seconds = getRemainingSeconds(storeTime.time);
      const timeValue = getValueFromTime(seconds);
      start(timeValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  useEffect(() => {
    handleTimerOnMount();
  }, [handleTimerOnMount]);

  // User driven functions
  const handleStart = useCallback(() => {
    const time = start(value);
    setStoreTime({ time, timeUpAck: false });
  }, [setStoreTime, start, value]);
  const handlePause = useCallback(() => {
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
      handleStart,
      handlePause,
      handleHoursChange,
      handleMinutesChange,
      handleSecondsChange,
    }),
    [
      value,
      handleHoursChange,
      handleMinutesChange,
      handlePause,
      handleSecondsChange,
      handleStart,
      timeUp,
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
