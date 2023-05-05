/* eslint-disable react/no-danger */
import { ChangeEvent, useRef } from 'react';
import getClassName from 'renderer/functions/getClassName';
import styles from './textarea.module.css';

type Target = {
  value: string;
} & EventTarget &
  HTMLDivElement;
interface TextChangeEvent extends ChangeEvent<HTMLDivElement> {
  target: Target;
}
type TextareaProps = {
  value: string;
  onChange: (_event: TextChangeEvent) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};
const Textarea = ({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  className = '',
}: TextareaProps) => {
  const defaultValue = useRef(value);

  const handleChange = (event: TextChangeEvent) => {
    event.target.value = event.target.textContent || '';
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
