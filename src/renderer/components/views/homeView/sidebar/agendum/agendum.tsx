import { useState } from 'react';
import styles from './agendum.module.css';
import ProgramsTab from './programsTab/programsTab';
import TimeslotsTab from './timeSlotsTab/timeSlotsTab';

const Agendum = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {activeTab === 0 && <ProgramsTab />}
      {activeTab === 1 && <TimeslotsTab />}
    </>
  );
};

export default Agendum;
