import { useState } from 'react';
import getClassName from 'renderer/functions/getClassName';
import Agendum from './agendum/agendum';
import QuickSettings from './quickSettings/quickSettings';
import styles from './sidebar.module.css';

type MenuBarProps = {
  isOpen: boolean;
  handleClick: () => void;
};

const MenuBar = ({ isOpen, handleClick }: MenuBarProps) => {
  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={styles.menubar + getClassName(isOpen, styles.isOpen)}
      >
        <div className={styles.first} />
        <div className={styles.second} />
        <div className={styles.third} />
      </button>
    </>
  );
};

type SideBarTabButtonsProps = {
  switchTab: (index: number) => void;
  activeTab: number;
};

const SidebarTabsButtons = ({
  activeTab,
  switchTab,
}: SideBarTabButtonsProps) => {
  return (
    <>
      <div className={styles.sidebarTabButtons}>
        <button
          type="button"
          onClick={() => switchTab(0)}
          className={getClassName(activeTab === 0, styles.activeTab)}
        >
          Agendum
        </button>
        <button
          type="button"
          onClick={() => switchTab(1)}
          className={getClassName(activeTab === 1, styles.activeTab)}
        >
          Quick Settings
        </button>
      </div>
    </>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const switchTab = (index: number) => setActiveTab(index);

  return (
    <>
      <div className={styles.sidebarContainer}>
        <MenuBar isOpen={isOpen} handleClick={toggleSidebar} />
        <div className={styles.sidebar + getClassName(isOpen, styles.isOpen)}>
          <SidebarTabsButtons activeTab={activeTab} switchTab={switchTab} />
          <div className={styles.sidebarTabs}>
            {activeTab === 0 && <Agendum />}
            {activeTab === 1 && <QuickSettings />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
