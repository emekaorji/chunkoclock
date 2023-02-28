import React, { useEffect, useMemo, useState } from 'react';
import TimeInput from 'renderer/components/interface/timeInput/timeInput';
import styles from './digital.module.css';

// type DigitalProps = {};
type eventProp = React.ChangeEvent<HTMLInputElement>;

const Digital = () => {
  const [time, setTime] = useState({
    hoursInSeconds: 0,
    minutesInSeconds: 0,
    secondsInSeconds: 0,
  });
  const [play, setPlay] = useState(true);
  const [timer, setTimer] = useState(0);

  console.log(time);
  useEffect(() => {
    setTimer(Object.values(time).reduce((a, b) => a + b));
  }, [time]);

  useEffect(() => {
    if (!play) return;
    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [play]);

  const handleHoursChange = (hours: number) => {
    setTime((prev) => ({ ...prev, hoursInSeconds: hours * 60 * 60 }));
  };
  const handleMinutesChange = (minutes: number) => {
    setTime((prev) => ({ ...prev, hoursInSeconds: minutes * 60 }));
  };
  const handleSecondsChange = (seconds: number) => {
    setTime((prev) => ({ ...prev, hoursInSeconds: seconds }));
  };

  return (
    <>
      <div className={styles.digital}>
        <TimeInput
          onTimeChange={handleHoursChange}
          onFocus={() => setPlay(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setPlay(true);
            }
          }}
          type="hours"
        />
        <TimeInput
          onTimeChange={handleMinutesChange}
          onFocus={() => setPlay(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setPlay(true);
            }
          }}
          type="minutes"
        />
        <TimeInput
          onTimeChange={handleSecondsChange}
          onFocus={() => setPlay(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setPlay(true);
            }
          }}
          type="seconds"
        />
      </div>
    </>
  );
};

export default Digital;
