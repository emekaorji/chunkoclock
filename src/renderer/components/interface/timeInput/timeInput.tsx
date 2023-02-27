import React from 'react';

type TimeInputProps = {
  value: string | number;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TimeInput = ({ value, ...props }: TimeInputProps) => {
  return (
    <>
      <input value={value} {...props} />
    </>
  );
};

export default TimeInput;
