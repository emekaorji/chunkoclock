import {
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import useOnClickOutside from 'renderer/hooks/view/useOnClickOutside';
import styles from './timeSlot.module.css';
import useAgendumContext from '../../hooks/useAgendumContext';

type TimeSlotProps = {
  id: string;
  title: string;
  placeholder: string;
  description: string;
  start: string;
  end: string;
  isLast: boolean;
};

const TimeSlot = forwardRef(
  (
    { id, title, placeholder, description, start, end, isLast }: TimeSlotProps,
    ref
  ) => {
    const [timeSlotTitle, setTimeSlotTitle] = useState(title);
    const [timeSlotStart, setTimeSlotStart] = useState('09:00 AM');
    const [timeSlotEnd, setTimeSlotEnd] = useState('10:00 AM');
    const [isEditingState, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { handleDeleteProgram, handleSelectProgram, handleUpdateProgram } =
      useAgendumContext();

    const isEditing = useMemo(
      () => isEditingState || isLast,
      [isEditingState, isLast]
    );

    useImperativeHandle(
      ref,
      () => ({
        select() {
          if (isEditing) {
            inputRef.current?.select();
          }
        },
      }),
      [isEditing]
    );

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTimeSlotTitle(event.target.value);
    };
    const handleEdit = () => setIsEditing(true);
    const handleSave = () => {
      if (!isEditing) return;
      handleUpdateProgram(id, (program) => ({
        ...program,
        title: timeSlotTitle,
      }));
      setIsEditing(false);
    };
    const handleDelete = () => {
      setIsDeleting(true);
      setTimeout(() => handleDeleteProgram(id), 200);
    };
    const handleClick = () => {
      handleSelectProgram(id);
    };

    useOnClickOutside(containerRef, handleSave);

    return (
      <>
        <div>
          <div className={styles.inputContainer}>
            {isEditing ? (
              <input
                type="text"
                placeholder={placeholder}
                className={styles.input}
                value={timeSlotTitle}
                onChange={handleInputChange}
                disabled={!isEditing}
                ref={inputRef}
              />
            ) : (
              <div className={styles.title}>{timeSlotTitle}</div>
            )}
          </div>
          <div className="title">{}</div>
        </div>
      </>
    );
  }
);

export default TimeSlot;

/**
 * Id
 * Title
 * Start time
 * End time
 * Play button
 * Edit button
 * Delete button
 */
