import Controls from './controls/controls';
import Timer from './timer/timer';
import styles from './display.module.css';

const Display = () => {
  return (
    <>
      <div className={styles.display}>
        <Timer />
        <Controls />
      </div>
    </>
  );
};

export default Display;
