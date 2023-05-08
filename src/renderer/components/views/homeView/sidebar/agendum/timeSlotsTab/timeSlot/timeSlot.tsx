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
import PenIcon from 'renderer/components/interface/icons/pen';
import TrashIcon from 'renderer/components/interface/icons/trash';
import addTime from 'renderer/functions/addTime';
import Textarea, {
  TextChangeEvent,
} from 'renderer/components/interface/textarea/textarea';
import styles from './timeSlot.module.css';
import useAgendumContext from '../../hooks/useAgendumContext';
import { ITimeSlot } from '../../types/timeSlotTypes';

type TimeSlotProps = {
  id: string;
  title: string;
  placeholder: string;
  description: string;
  speaker: string;
  start: string;
  end: string;
  overlap: string;
  prevTimeSlot: ITimeSlot | undefined;
  isLast: boolean;
};

const TimeSlot = forwardRef(
  (
    {
      id,
      title,
      placeholder,
      description,
      speaker,
      start,
      end,
      overlap,
      prevTimeSlot,
      isLast,
    }: TimeSlotProps,
    ref
  ) => {
    const [timeSlotTitle, setTimeSlotTitle] = useState(title);
    const [timeSlotStart, setTimeSlotStart] = useState(start);
    const [timeSlotEnd, setTimeSlotEnd] = useState(end);
    const [timeSlotOverlap, setTimeSlotOverlap] = useState(overlap);
    const [timeSlotSpeaker, setTimeSlotSpeaker] = useState(speaker);
    const [timeSlotDescription, setTimeSlotDescription] = useState(description);
    const [isEditingState, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef(title);

    const { handleDeleteTimeSlot, handleUpdateTimeSlot } = useAgendumContext();

    const totalTime = useMemo(() => {
      const startTime = new Date();
      const endTime = new Date();
      let [hours, minutes] = timeSlotStart.split(':');
      startTime.setHours(Number(hours), Number(minutes));
      [hours, minutes] = timeSlotEnd.split(':');
      endTime.setHours(Number(hours), Number(minutes));
      const timeInMilliSeconds = endTime.getTime() - startTime.getTime();
      const timeInSeconds = timeInMilliSeconds / 1000;
      const timeInMinutes = Math.floor((timeInSeconds / 60) % 60);
      const timeInHours = Math.floor(timeInSeconds / 60 / 60);

      return timeInHours > 0
        ? `${timeInHours}hr${timeInHours > 1 ? 's' : ''}${
            timeInMinutes > 0
              ? ` ${timeInMinutes}min${timeInMinutes > 1 ? 's' : ''}`
              : ''
          }`
        : `${timeInMinutes}min${timeInMinutes > 1 ? 's' : ''}`;
    }, [timeSlotEnd, timeSlotStart]);

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

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      const maxLength =
        target.maxLength > 0 ? target.maxLength : Number.POSITIVE_INFINITY;
      setTimeSlotTitle(target.value.substring(0, maxLength));
    };
    const handleStartChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.validity.valid) return;
      setTimeSlotStart(event.target.value);
    };
    const handleEndChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.validity.valid) return;
      setTimeSlotEnd(event.target.value);
    };
    const handleSpeakerChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      const maxLength =
        target.maxLength > 0 ? target.maxLength : Number.POSITIVE_INFINITY;
      setTimeSlotSpeaker(target.value.substring(0, maxLength));
    };
    const handleDescriptionChange = (event: TextChangeEvent) => {
      const { target } = event;
      console.log(target.maxLength);
      const maxLength =
        target.maxLength > 0 ? target.maxLength : Number.POSITIVE_INFINITY;
      setTimeSlotDescription(target.value.substring(0, maxLength));
    };
    const handleOverlapChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.validity.valid) return;
      setTimeSlotOverlap(event.target.value);
    };
    const handleEdit = () => setIsEditing(true);
    const handleSave = () => {
      if (!isEditing) return;
      const savedTitle =
        timeSlotTitle ||
        (() => {
          setTimeSlotTitle(titleRef.current);
          return titleRef.current;
        })();
      titleRef.current = savedTitle;
      handleUpdateTimeSlot(id, (program) => ({
        ...program,
        title: savedTitle,
        start: timeSlotStart,
        end: timeSlotEnd,
        overlap: timeSlotOverlap,
        speaker: timeSlotSpeaker,
        description: timeSlotDescription,
      }));
      setIsEditing(false);
    };
    const handleDelete = () => {
      setIsDeleting(true);
      setTimeout(() => handleDeleteTimeSlot(id), 200);
    };
    const handleClick = () => {
      setIsExpanded(!isExpanded);
    };

    useOnClickOutside(containerRef, handleSave);

    return (
      <>
        <div
          className={
            styles.timeSlot + getClassName(isDeleting, styles.isDeleting)
          }
        >
          <div className={styles.details}>
            {isEditing ? (
              <>
                <input
                  type="text"
                  placeholder={placeholder}
                  className={styles.titleInput}
                  value={timeSlotTitle}
                  onChange={handleTitleChange}
                  disabled={!isEditing}
                  ref={inputRef}
                />
                <input
                  type="text"
                  placeholder="Who's taking this session?"
                  maxLength={40}
                  className={styles.speakerInput}
                  value={timeSlotSpeaker}
                  onChange={handleSpeakerChange}
                  disabled={!isEditing}
                />
                <Textarea
                  className={styles.descriptionInput}
                  value={timeSlotDescription}
                  onChange={handleDescriptionChange}
                  placeholder="Write a lil something here.."
                  maxLength={500}
                  disabled={!isEditing}
                />
                <div className={styles.timeInputs}>
                  <label htmlFor="startTime">
                    <span>Start time</span>
                    <input
                      type="time"
                      id="startTime"
                      min={addTime(
                        prevTimeSlot?.end,
                        Number(prevTimeSlot?.overlap)
                      )}
                      value={timeSlotStart}
                      onChange={handleStartChange}
                    />
                  </label>
                  <label htmlFor="endTime">
                    <span>End time</span>
                    <input
                      type="time"
                      id="endTime"
                      min={addTime(timeSlotStart, 1)}
                      value={timeSlotEnd}
                      onChange={handleEndChange}
                    />
                  </label>
                  <label htmlFor="overlapTime">
                    <span>Extra time</span>
                    <input
                      type="number"
                      id="overlapTime"
                      min="1"
                      max="10"
                      value={timeSlotOverlap}
                      onChange={handleOverlapChange}
                    />
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className={styles.titleText}>{timeSlotTitle}</div>
                {timeSlotDescription && (
                  <div
                    className={
                      styles.descriptionText +
                      getClassName(isExpanded, styles.isExpanded)
                    }
                  >
                    {timeSlotDescription}
                  </div>
                )}
                <div className={styles.extraInfo}>
                  <div className={styles.timeText}>
                    {getFormattedTime(timeSlotStart, 'hh:mm P')}
                    <span className={styles.dash}>-</span>
                    {getFormattedTime(timeSlotEnd, 'hh:mm P')}
                    <span> • </span>
                    {totalTime}{' '}
                    <span
                      className={styles.extraTime}
                      title={`${timeSlotOverlap} mins extra time`}
                    >
                      (+{timeSlotOverlap})
                    </span>
                  </div>
                  {timeSlotSpeaker && (
                    <div className={styles.speakerText}>
                      &#8212; {timeSlotSpeaker}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {!isEditing ? (
            <>
              <button
                type="button"
                className={styles.clickableOverlay}
                onClick={handleClick}
              />
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
            </>
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
