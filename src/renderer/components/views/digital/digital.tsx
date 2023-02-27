import React, { useMemo, useState } from 'react';
import styles from './digital.module.css';

type DigitalProps = {};

const Digital = () => {
  const [time, setTime] = useState(230);

  const minutes = useMemo(() => {
    return Math.floor(time / 60);
  }, [time]);

  return (
    <>
      <div className={styles.digital}>Digital</div>
    </>
  );
};

export default Digital;
