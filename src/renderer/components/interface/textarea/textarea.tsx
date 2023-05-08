/* eslint-disable react/no-danger */
import { ChangeEvent, useRef } from 'react';
import getClassName from 'renderer/functions/getClassName';
import styles from './textarea.module.css';

// type Target = EventTarget & HTMLDivElement & HTMLInputElement;
interface TextChangeEvent
  extends ChangeEvent<HTMLDivElement & HTMLInputElement> {}
type TextareaProps = {
  value: string;
  onChange: (_event: TextChangeEvent) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
} & Partial<ChangeEvent<HTMLDivElement & HTMLInputElement>>;
const Textarea = ({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  className = '',
  ...props
}: TextareaProps) => {
  const defaultValue = useRef(value);

  const handleChange = (event: TextChangeEvent) => {
    event.target.value = event.target.textContent || '';
    event.target = { ...event.target, ...props };
    onChange(event);
  };

  return (
    <>
      <div
        className={styles.textarea + getClassName(className)}
        placeholder={!value ? placeholder : ''}
        onInput={handleChange}
        contentEditable={!disabled}
        dangerouslySetInnerHTML={{ __html: defaultValue.current }}
      />
    </>
  );
};

export { TextChangeEvent };
export default Textarea;
