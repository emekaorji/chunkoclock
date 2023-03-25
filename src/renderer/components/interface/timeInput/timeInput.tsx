import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  ChangeEventHandler,
  FocusEventHandler,
  useRef,
} from 'react';
import getClassName from 'renderer/functions/getClassName';
import styles from './timeInput.module.css';

type TimeInputProps = {
  name: 'days' | 'hours' | 'minutes' | 'seconds';
  value: number;
  onChange: ChangeEventHandler;
  onFocus: FocusEventHandler;
  onBlur: FocusEventHandler;
  onEnter?: () => void;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const pad0 = (value: number | string) => value.toString().padStart(2, '0');

const TimeInput = ({
  name,
  value = 0,
  onChange,
  onFocus,
  onBlur,
  onEnter,
  className,
  ...props
}: TimeInputProps) => {
  const paddedValue = pad0(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.target.setSelectionRange(2, 2);
    onFocus(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { relatedTarget } = event;
    const inputs = document.querySelectorAll<HTMLInputElement>('.timeInput');
    if (
      !(
        relatedTarget === inputs[0] ||
        relatedTarget === inputs[1] ||
        relatedTarget === inputs[2]
      )
    ) {
      onBlur(event);
    }
  };

  const handleEnter = () => {
    const inputs = document.querySelectorAll<HTMLInputElement>('.timeInput');
    if (name === 'hours') {
      inputs[1].focus();
    }
    if (name === 'minutes') {
      inputs[2].focus();
    }
    if (name === 'seconds') {
      inputs[2].blur();
    }
    if (typeof onEnter === 'function') {
      onEnter();
    }
  };

  const handleShiftEnter = () => {
    const inputs = document.querySelectorAll<HTMLInputElement>('.timeInput');
    if (name === 'minutes') {
      inputs[0].focus();
    }
    if (name === 'seconds') {
      inputs[1].focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEnter();
    }
    if (event.key === 'Enter' && event.shiftKey) {
      handleShiftEnter();
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        className={`timeInput ${styles.input}${getClassName(className)}`}
        value={paddedValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        // @ts-ignore
        onClick={handleFocus}
        {...props}
      />
    </>
  );
};

export default TimeInput;
