import React, { FocusEvent, useRef } from 'react';
import styles from './timeInput.module.css';

type TimeInputProps = {
  value: number;
  onFocus: (event: FocusEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const pad0 = (value: number | string) => value.toString().padStart(2, '0');

const TimeInput = ({ value = 0, onFocus, ...props }: TimeInputProps) => {
  const paddedValue = pad0(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.target.setSelectionRange(2, 2);
    onFocus(event);
  };

  return (
    <>
      <input
        ref={inputRef}
        value={paddedValue}
        className={styles.input}
        type="text"
        onFocus={handleFocus}
        // @ts-ignore
        onClick={handleFocus}
        {...props}
      />
    </>
  );
};

export default TimeInput;
