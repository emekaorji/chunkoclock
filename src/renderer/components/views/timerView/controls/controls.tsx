import SmallButton from 'renderer/components/interface/buttons/smallButton';
import PauseIcon from 'renderer/components/interface/icons/pause';
import PlayIcon from 'renderer/components/interface/icons/play';
import RestartIcon from 'renderer/components/interface/icons/restart';
import useTimerViewContext from '../hooks/useTimerViewContext';
import styles from './controls.module.css';

const Controls = () => {
  const { isPaused, isPlaying, handleStart, handlePause } =
    useTimerViewContext();

  return (
    <>
      <div className={styles.controls}>
        {!isPlaying && (
          <SmallButton onClick={handleStart}>
            <PlayIcon />
          </SmallButton>
        )}
        {!isPaused && (
          <SmallButton onClick={handlePause}>
            <PauseIcon />
          </SmallButton>
        )}
        <SmallButton onClick={handlePause}>
          <RestartIcon />
        </SmallButton>
      </div>
    </>
  );
};

export default Controls;
