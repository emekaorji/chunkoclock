/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState } from 'react';
import ThemeInput, {
  Theme,
  ThemeEvent,
} from 'renderer/components/interface/themeInput/themeInput';
import useOnClickOutside from 'renderer/hooks/view/useOnClickOutside';
import CancelIcon from 'renderer/components/interface/icons/cancel';
import PenIcon from 'renderer/components/interface/icons/pen';
import TrashIcon from 'renderer/components/interface/icons/trash';
import getClassName from 'renderer/functions/getClassName';
import { ChangeEventProp } from 'renderer/types/eventTypes';
import Textarea, {
  TextChangeEvent,
} from 'renderer/components/interface/textarea/textarea';
import getFormattedDate from 'renderer/functions/getFormattedDate';
import useAgendumContext from '../../hooks/useAgendumContext';
import styles from './programDetails.module.css';

type ProgramDetailsProps = {
  id: string;
  title: string;
  date: string;
  theme: Theme;
  description: string;
  buttonStyle: string;
};
const ProgramDetails = ({
  id,
  title,
  theme,
  date,
  description,
  buttonStyle,
}: ProgramDetailsProps) => {
  const { handleCloseProgram, handleUpdateProgram, handleDeleteProgram } =
    useAgendumContext();
  const [programTitle, setProgramTitle] = useState(title);
  const [programTheme, setProgramTheme] = useState(theme);
  const [programDate, setProgramDate] = useState(date);
  const [programDescription, setProgramDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const collapsedBeforeEdit = useRef(false);

  const handleTitleChange = (event: ChangeEventProp) => {
    setProgramTitle(event.target.value);
  };
  const handleDescriptionChange = (event: TextChangeEvent) => {
    setProgramDescription(event.target.value);
  };
  const handleDateChange = (event: ChangeEventProp) => {
    setProgramDate(event.target.value);
  };
  const handleThemeChange = (event: ThemeEvent) => {
    setProgramTheme(event.target.value);
  };
  const expand = () => setIsExpanded(true);
  const collapse = () => setIsExpanded(false);
  const handleEdit = () => {
    if (!isExpanded) {
      collapsedBeforeEdit.current = true;
      expand();
    } else {
      collapsedBeforeEdit.current = false;
    }
    setIsEditing(true);
    inputRef.current?.select();
  };
  const handleSave = () => {
    if (!isEditing) return;
    handleUpdateProgram(id, (program) => ({
      ...program,
      title: programTitle,
      theme: programTheme,
      date: programDate,
      description: programDescription,
    }));
    setIsEditing(false);
    if (collapsedBeforeEdit.current) collapse();
  };
  const handleDelete = () => {
    handleCloseProgram();
    setTimeout(() => handleDeleteProgram(id), 100);
  };
  const handleClick = () => (isExpanded ? collapse() : expand());

  useOnClickOutside(containerRef, handleSave);

  return (
    <div className={styles.programDetailsContainer}>
      <div
        className={
          styles.programDetails + getClassName(isExpanded, styles.expanded)
        }
        ref={containerRef}
        tabIndex={-1}
      >
        <div className={styles.buttons}>
          {!isEditing ? (
            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCloseProgram}
              >
                <CancelIcon />
              </button>
              <button
                type="button"
                className={`${styles.editButton} ${buttonStyle}`}
                onClick={handleEdit}
              >
                <PenIcon />
              </button>
              <button
                type="button"
                className={`${styles.deleteButton} ${buttonStyle}`}
                onClick={handleDelete}
              >
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
        <div className={styles.info}>
          <div className={styles.title}>
            {isEditing ? (
              <input
                type="text"
                placeholder={programTitle}
                className={styles.titleInput}
                value={programTitle}
                onChange={handleTitleChange}
                disabled={!isEditing}
                ref={inputRef}
              />
            ) : (
              <div className={styles.titleText}>{programTitle}</div>
            )}
            <ThemeInput
              value={programTheme || 'monotone'}
              onChange={handleThemeChange}
              disabled={!isEditing}
              className={styles.themeInput}
            />
          </div>
          {isEditing ? (
            <>
              <Textarea
                className={styles.descriptionInput}
                value={programDescription}
                onChange={handleDescriptionChange}
                placeholder="Write a lil something here"
                disabled={!isEditing}
              />
              <input
                type="date"
                className={styles.dateInput}
                value={programDate}
                onChange={handleDateChange}
              />
            </>
          ) : (
            <>
              <div className={styles.descriptionText} ref={descriptionRef}>
                {programDescription}
              </div>
              <div className={styles.dateText}>
                {getFormattedDate(date, 'Dth Mmmm, YYYY')}
              </div>
            </>
          )}
        </div>
        {!isEditing && (
          <button
            type="button"
            className={styles.clickableOverlay}
            onClick={handleClick}
          />
        )}
      </div>
    </div>
  );
};

export default ProgramDetails;
