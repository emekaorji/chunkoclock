import { ChangeEvent, useRef, useState } from 'react';
import PenIcon from 'renderer/components/interface/icons/pen';
import useOnClickOutside from 'renderer/hooks/view/useOnClickOutside';
import styles from './program.module.css';

type ProgramProps = {
  id: string;
  title: string;
  date: string;
  theme: string;
};
const Program = ({ id, title, date, theme }: ProgramProps) => {
  const [inputTitle, setInputTitle] = useState(title);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };
  const handleFocus = () => setIsFocused(true);
  const handleSave = () => {
    // Do some things
    setIsFocused(false);
  };

  useOnClickOutside(containerRef, handleSave);

  return (
    <>
      <div className={styles.program} ref={containerRef}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            value={inputTitle}
            onChange={handleInputChange}
            disabled={!isFocused}
          />
        </div>
        {isFocused ? (
          <input type="date" />
        ) : (
          <div className={styles.date}>{date}</div>
        )}
        {!isFocused && (
          <button type="button" className={styles.clickableOverlay} />
        )}
        {!isFocused ? (
          <button
            type="button"
            className={styles.editButton}
            onClick={handleFocus}
          >
            <PenIcon />
          </button>
        ) : (
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
    </>
  );
};

export default Program;

/**
 * Id
 * Title
 * Date
 * Theme
 * Clickable
 * Edit button
 * Delete button
 */
