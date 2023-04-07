import Display from './display/display';
import HomeViewProvider from './provider/homeViewProvider';
import Sidebar from './sidebar/sidebar';
// import styles from './homeView.module.css';

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
    <HomeViewProvider>
      <HomeViewContent />
    </HomeViewProvider>
  );
};

export default HomeView;
