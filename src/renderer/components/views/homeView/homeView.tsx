import Display from './display/display';
import TimerViewProvider from './provider/timerViewProvider';
import Sidebar from './sidebar/sidebar';
// import styles from './timerView.module.css';

const HomeViewContent = () => {
  return (
    <>
      <Sidebar />
      <Display />
    </>
  );
};

const HomeView = () => {
  return (
    <TimerViewProvider>
      <HomeViewContent />
    </TimerViewProvider>
  );
};

export default HomeView;
