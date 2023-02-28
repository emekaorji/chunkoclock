import React, { useEffect, useMemo, useState } from 'react';
import TimeInput from 'renderer/components/interface/timeInput/timeInput';
import styles from './digital.module.css';

// type DigitalProps = {};
type eventProp = React.ChangeEvent<HTMLInputElement>;

const Digital = () => {
  const [time, setTime] = useState(230);
  const [play, setPlay] = useState(true);

  const hours = useMemo(() => {
    return Math.floor(time / 60 / 60);
  }, [time]);

  const minutes = useMemo(() => {
    return Math.floor(time / 60) % 60;
  }, [time]);

  const seconds = useMemo(() => {
    return time % 60;
  }, [time]);

  useEffect(() => {
    if (!play) return;
    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [play]);

  const handleHoursChange = (event: eventProp) => {
    const inputValue = parseInt(event.target.value, 10);
    if (inputValue > 99) return;
    const value = inputValue - hours;
    setTime((prev) => prev + value * 60 * 60 || 0);
  };
  const handleMinutesChange = (event: eventProp) => {
    const inputValue = parseInt(event.target.value, 10);
    if (minutes > 5) {
      setTime(
        (prev) => prev - minutes * 60 + (inputValue - minutes * 10) * 60 || 0
      );
      return;
    }
    if (inputValue > 59) return;
    const value = inputValue - minutes;
    setTime((prev) => prev + value * 60 || 0);
  };
  const handleSecondsChange = (event: eventProp) => {
    const inputValue = parseInt(event.target.value, 10);
    if (seconds > 5) {
      setTime((prev) => prev - seconds + (inputValue - seconds * 10) || 0);
      return;
    }
    if (inputValue > 59) return;
    const value = inputValue - seconds;
    setTime((prev) => prev + value || 0);
  };

  return (
    <>
      <div className={styles.digital}>
        <TimeInput
          value={hours}
          onChange={handleHoursChange}
          onFocus={() => setPlay(false)}
          onKeyDown={(event) => {
            if (event.key === 'Backspace') {
              event.preventDefault();
            }
            if (event.key === 'Enter') {
              setPlay(true);
              // @ts-ignore
              event.target.blur();
            }
          }}
        />
        :
        <TimeInput
          value={minutes}
          onChange={handleMinutesChange}
          onFocus={() => setPlay(false)}
          onKeyDown={(event) => {
            if (event.key === 'Backspace') {
              event.preventDefault();
            }
            if (event.key === 'Enter') {
              setPlay(true);
              // @ts-ignore
              event.target.blur();
            }
          }}
        />
        :
        <TimeInput
          value={seconds}
          onChange={handleSecondsChange}
          onFocus={() => setPlay(false)}
          onKeyDown={(event) => {
            if (event.key === 'Backspace') {
              event.preventDefault();
            }
            if (event.key === 'Enter') {
              setPlay(true);
              // @ts-ignore
              event.target.blur();
            }
          }}
        />
      </div>
    </>
  );
};

export default Digital;
