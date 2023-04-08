import SmallButton from 'renderer/components/interface/buttons/smallButton';
import PlusIcon from 'renderer/components/interface/icons/plus';
import styles from './timeSlotsTab.module.css';

const TimeslotsTab = () => {
  return (
    <>
      <div>
        <SmallButton type="button" className={styles.addButton}>
          <PlusIcon />
        </SmallButton>
      </div>
    </>
  );
};

export default TimeslotsTab;
