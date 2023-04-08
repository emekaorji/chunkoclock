/* eslint-disable no-plusplus */
import SmallButton from 'renderer/components/interface/buttons/smallButton';
import PlusIcon from 'renderer/components/interface/icons/plus';
import { v4 as uuidv4 } from 'uuid';
import styles from './programsTab.module.css';
import Program from './program/program';

const getIds = (num: number) => {
  const arr = [];
  for (let i = 0; i < num; i++)
    arr.push({
      id: uuidv4(),
      title: 'Amazing title',
      date: '10th October, 2023',
      theme: 'monotone',
    });
  return arr;
};

const ProgramsTab = () => {
  return (
    <>
      <div className={styles.tab}>
        <div className={styles.programsContainer}>
          {getIds(30).map((item) => (
            <Program
              key={item.id}
              id={item.id}
              title={item.title}
              date={item.date}
              theme={item.theme}
            />
          ))}
          <div className="anchor" />
        </div>
        {/* <div className={styles.newProgram}>
          <input type="text" />
        </div> */}
        <SmallButton type="button" className={styles.addButton}>
          <PlusIcon />
        </SmallButton>
      </div>
    </>
  );
};

export default ProgramsTab;
