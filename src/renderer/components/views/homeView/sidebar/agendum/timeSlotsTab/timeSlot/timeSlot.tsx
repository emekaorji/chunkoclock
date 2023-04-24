import {
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import useOnClickOutside from 'renderer/hooks/view/useOnClickOutside';
import getFormattedTime from 'renderer/functions/getFormattedTime';
import getClassName from 'renderer/functions/getClassName';
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

    const { handleDeleteTimeSlot, handleUpdateTimeSlot } = useAgendumContext();

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
    const handleStartChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTimeSlotStart(event.target.value);
    };
    const handleEndChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTimeSlotEnd(event.target.value);
    };
    const handleEdit = () => setIsEditing(true);
    const handleSave = () => {
      if (!isEditing) return;
      handleUpdateTimeSlot(id, (program) => ({
        ...program,
        title: timeSlotTitle,
      }));
      setIsEditing(false);
    };
    const handleDelete = () => {
      setIsDeleting(true);
      setTimeout(() => handleDeleteTimeSlot(id), 200);
    };
    const handleClick = () => {
      //
    };

    useOnClickOutside(containerRef, handleSave);

    return (
      <>
        <div
          className={
            styles.timeSlot + getClassName(isDeleting, styles.isDeleting)
          }
        >
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
          {isEditing ? (
            <div className={styles.secondaryInput}>
              <input
                type="time"
                value={timeSlotStart}
                onChange={handleStartChange}
              />
              <input
                type="time"
                value={timeSlotEnd}
                onChange={handleEndChange}
              />
            </div>
          ) : (
            <div className={styles.time}>
              {getFormattedTime('09:44 am', 'quartile')} -{' '}
              {getFormattedTime(timeSlotEnd, 'hh:mm P')}
            </div>
          )}
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
