import { ChangeEvent, useRef, useState } from 'react';
import PenIcon from 'renderer/components/interface/icons/pen';
import useOnClickOutside from 'renderer/hooks/view/useOnClickOutside';
import TrashIcon from 'renderer/components/interface/icons/trash';
import ThemeInput from 'renderer/components/interface/themeInput/themeInput';
import styles from './program.module.css';

type ProgramProps = {
  id: string;
  title: string;
  date: string;
  theme: string;
};
const Program = ({ id, title, date, theme }: ProgramProps) => {
  const [inputTitle, setInputTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    // Do some things
    setIsEditing(false);
  };
  const handleClick = () => {
    console.log('clicked', id);
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
            disabled={!isEditing}
          />
        </div>
        {isEditing ? (
          <>
            <input type="date" />
            <ThemeInput />
          </>
        ) : (
          <div className={styles.date}>{date}</div>
        )}
        {!isEditing && (
          <button
            type="button"
            className={styles.clickableOverlay}
            onClick={handleClick}
          />
        )}
        {!isEditing ? (
          <div className={styles.hiddenButtons}>
            <button
              type="button"
              className={styles.editButton}
              onClick={handleEdit}
            >
              <PenIcon />
            </button>
            <button type="button" className={styles.deleteButton}>
              <TrashIcon />
            </button>
          </div>
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
