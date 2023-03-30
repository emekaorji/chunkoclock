import SmallButton from 'renderer/components/interface/buttons/smallButton';
import PauseIcon from 'renderer/components/interface/icons/pause';
import PlayIcon from 'renderer/components/interface/icons/play';
import RestartIcon from 'renderer/components/interface/icons/restart';
import useTimerViewContext from '../../hooks/useTimerViewContext';
import styles from './controls.module.css';

const Controls = () => {
  const { isPlaying, timeUpAck, handlePause, handleRestart, handleStart } =
    useTimerViewContext();

  return (
    <>
      <div className={styles.controls}>
        {!isPlaying && (
          <SmallButton onClick={handleStart}>
            <PlayIcon />
          </SmallButton>
        )}
        {isPlaying && !timeUpAck && (
          <SmallButton onClick={handlePause}>
            <PauseIcon />
          </SmallButton>
        )}
        <SmallButton onClick={handleRestart}>
          <RestartIcon />
        </SmallButton>
      </div>
    </>
  );
};

export default Controls;
