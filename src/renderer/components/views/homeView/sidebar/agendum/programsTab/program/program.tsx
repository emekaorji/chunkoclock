import {
  ChangeEvent,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
  useMemo,
  memo,
} from 'react';
import PenIcon from 'renderer/components/interface/icons/pen';
import useOnClickOutside from 'renderer/hooks/view/useOnClickOutside';
import TrashIcon from 'renderer/components/interface/icons/trash';
import ThemeInput, {
  Theme,
  ThemeEvent,
} from 'renderer/components/interface/themeInput/themeInput';
import getClassName from 'renderer/functions/getClassName';
import getFormattedDate from 'renderer/functions/getFormattedDate';
import styles from './program.module.css';

interface IProgram {
  readonly id: string;
  title: string;
  placeholder: string;
  date: string;
  theme: Theme;
}
type TInputRef = { select: () => void };
type ProgramProps = {
  isLast: boolean;
  id: string;
  title: string;
  date: string;
  theme: Theme;
  placeholder: string;
  deleteProgram: (id: string) => void;
  updateProgram: (
    id: string,
    newProgram: (program: IProgram) => IProgram
  ) => void;
};
const Program = forwardRef(
  (
    {
      isLast,
      id,
      title,
      date,
      theme,
      placeholder,
      deleteProgram,
      updateProgram,
    }: ProgramProps,
    ref: ForwardedRef<TInputRef>
  ) => {
    const [programTitle, setProgramTitle] = useState(title);
    const [programTheme, setProgramTheme] = useState(theme);
    const [programDate, setProgramDate] = useState(date);
    const [isEditingState, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isEditing = useMemo(
      () => isEditingState || isLast,
      [isEditingState, isLast]
    );

    useImperativeHandle(
      ref,
      () => ({
        select() {
          console.log(inputRef);
          if (isEditing) {
            inputRef.current?.select();
          }
        },
      }),
      [isEditing]
    );

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setProgramTitle(event.target.value);
    };
    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
      setProgramDate(event.target.value);
    };
    const handleThemeChange = (event: ThemeEvent) => {
      setProgramTheme(event.target.value);
    };
    const handleEdit = () => setIsEditing(true);
    const handleSave = () => {
      if (!isEditing) return;
      updateProgram(id, (program) => ({
        ...program,
        title: programTitle,
        theme: programTheme,
        date: programDate,
      }));
      setIsEditing(false);
    };
    const handleDelete = () => {
      setIsDeleting(true);
      setTimeout(() => deleteProgram(id), 200);
    };
    const handleClick = () => {
      // eslint-disable-next-line no-console
      console.log('clicked', id);
    };

    useOnClickOutside(containerRef, handleSave);

    return (
      <>
        <div
          className={
            styles.program + getClassName(isDeleting, styles.isDeleting)
          }
          ref={containerRef}
        >
          <div className={styles.inputContainer}>
            {isEditing ? (
              <input
                type="text"
                placeholder={placeholder}
                className={styles.input}
                value={programTitle}
                onChange={handleInputChange}
                disabled={!isEditing}
                ref={inputRef}
              />
            ) : (
              <div className={styles.title}>{programTitle}</div>
            )}
          </div>
          {isEditing ? (
            <div className={styles.secondaryInput}>
              <input
                type="date"
                value={programDate}
                onChange={handleDateChange}
              />
              <ThemeInput value={programTheme} onChange={handleThemeChange} />
            </div>
          ) : (
            <div className={styles.date}>
              {getFormattedDate(programDate, 'Dth Mmmm, YYYY')}
            </div>
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
              <button
                type="button"
                className={styles.deleteButton}
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
      </>
    );
  }
);

export { IProgram, TInputRef };
export default memo(Program);

/**
 * Id
 * Title
 * Date
 * Theme
 * Clickable
 * Edit button
 * Delete button
 */
