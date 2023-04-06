import PlusIcon from 'renderer/components/interface/icons/plus';
import SmallButton from 'renderer/components/interface/buttons/smallButton';
import styles from './agendum.module.css';

const Agendum = () => {
  return (
    <>
      <div className={styles.agendumContainer}>
        <SmallButton type="button" className={styles.addButton}>
          <PlusIcon />
        </SmallButton>
      </div>
    </>
  );
};

export default Agendum;
