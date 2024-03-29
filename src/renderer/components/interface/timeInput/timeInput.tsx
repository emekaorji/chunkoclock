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
  onEnter?: () => void;
  className?: string;
  hidden?: boolean;
  hasColon?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const pad0 = (value: number | string) => value.toString().padStart(2, '0');

const TimeInput = ({
  name,
  value = 0,
  onChange,
  onFocus,
  onEnter,
  className,
  hidden = false,
  hasColon = false,
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

  const handleLeftArrow = () => {
    const inputs = document.querySelectorAll<HTMLInputElement>('.timeInput');
    if (name === 'minutes') {
      inputs[0].focus();
    }
    if (name === 'seconds') {
      inputs[1].focus();
    }
  };
  const handleRightArrow = () => {
    const inputs = document.querySelectorAll<HTMLInputElement>('.timeInput');
    if (name === 'hours') {
      inputs[1].focus();
    }
    if (name === 'minutes') {
      inputs[2].focus();
    }
  };
  const handleEnter = () => {
    const inputs = document.querySelectorAll<HTMLInputElement>('.timeInput');
    handleRightArrow();
    if (name === 'seconds') {
      inputs[2].blur();
    }
    if (typeof onEnter === 'function') {
      onEnter();
    }
  };
  const handleShiftEnter = () => {
    handleLeftArrow();
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEnter();
    }
    if (event.key === 'Enter' && event.shiftKey) {
      handleShiftEnter();
    }
    if (event.key === 'ArrowLeft') {
      handleLeftArrow();
    }
    if (event.key === 'ArrowRight') {
      handleRightArrow();
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        className={`timeInput ${styles.input} ${styles.visible}${getClassName(
          className
        )}${getClassName(hidden, styles.hidden)}`}
        value={paddedValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        // @ts-ignore
        onClick={handleFocus}
        {...props}
      />
      {hasColon && (
        <span className={styles.visible + getClassName(hidden, styles.hidden)}>
          :
        </span>
      )}
    </>
  );
};

export default TimeInput;
