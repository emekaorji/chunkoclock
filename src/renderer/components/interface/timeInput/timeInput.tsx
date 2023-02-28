import React from 'react';
import styles from './timeInput.module.css';

type TimeInputProps = {
  value: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

const pad0 = (value: number | string) => value.toString().padStart(2, '0');

const TimeInput = ({ value, ...props }: TimeInputProps) => {
  const paddedValue = pad0(value);
  return (
    <>
      <input
        value={paddedValue}
        className={styles.input}
        type="text"
        {...props}
      />
    </>
  );
};

export default TimeInput;
