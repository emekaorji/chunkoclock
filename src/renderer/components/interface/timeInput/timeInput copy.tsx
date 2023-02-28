import React, { useState } from 'react';

type eventProp = React.ChangeEvent<HTMLInputElement>;

type TimeInputProps = {
  type: 'hours' | 'minutes' | 'seconds';
  onTimeChange: (e: number) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const pad0 = (value: number | string) => value.toString().padStart(2, '0');

const TimeInput = ({ type, onTimeChange }: TimeInputProps) => {
  const [value, setValue] = useState(0);
  const paddedValue = pad0(value);
  const limit = type === 'hours' ? 99 : 59;

  const handleChange = (event: eventProp) => {
    const inputValue = parseInt(event.target.value, 10) || 0;
    if (type !== 'hours' && value > 5) {
      setValue(inputValue - value * 10 || 0);
      return;
    }
    if (inputValue > limit) return;
    setValue(inputValue);
    onTimeChange(inputValue);
  };

  return (
    <>
      <input value={paddedValue} onChange={handleChange} type="text" />
    </>
  );
};

export default TimeInput;
