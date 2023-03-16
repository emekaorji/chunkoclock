import SmallButton from 'renderer/components/interface/buttons/smallButton';
import PlayIcon from 'renderer/components/interface/icons/play';
import StopIcon from 'renderer/components/interface/icons/stop';
import useTimerViewContext from '../hooks/useTimerViewContext';
import styles from './controls.module.css';

const Controls = () => {
  const { handleStart, handlePause } = useTimerViewContext();

  return (
    <>
      <div className={styles.controls}>
        <SmallButton onClick={handleStart}>
          <PlayIcon />
        </SmallButton>
        <SmallButton onClick={handlePause}>
          <StopIcon />
        </SmallButton>
      </div>
    </>
  );
};

export default Controls;
