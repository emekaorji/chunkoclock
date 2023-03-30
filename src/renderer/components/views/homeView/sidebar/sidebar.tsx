import Agendum from './agendum/agendum';
import QuickSettings from './quickSettings/quickSettings';
import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <>
      <div className={styles.sidebar}>
        <Agendum />
        <QuickSettings />
      </div>
    </>
  );
};

export default Sidebar;
