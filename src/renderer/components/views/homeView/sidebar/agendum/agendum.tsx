import styles from './agendum.module.css';
import ProgramsTab from './programsTab/programsTab';
import TimeSlotsTab from './timeSlotsTab/timeSlotsTab';
import AgendumProvider from './provider/agendumProvider';

const AgendumContent = () => {
  return (
    <>
      <div className={styles.agendumContainer}>
        <ProgramsTab />
        <TimeSlotsTab />
      </div>
    </>
  );
};

const Agendum = () => {
  return (
    <AgendumProvider>
      <AgendumContent />
    </AgendumProvider>
  );
};

export default Agendum;
