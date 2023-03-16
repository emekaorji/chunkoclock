import TimerViewProvider from './provider/timerViewProvider';
import Display from './display/display';
// import styles from './timerView.module.css';
import Controls from './controls/controls';

const TimerViewContent = () => {
  return (
    <>
      <Display />
      <Controls />
    </>
  );
};

const TimerView = () => {
  return (
    <TimerViewProvider>
      <TimerViewContent />
    </TimerViewProvider>
  );
};

export default TimerView;
