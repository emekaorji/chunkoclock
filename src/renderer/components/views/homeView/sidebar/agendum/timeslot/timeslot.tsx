import styles from './timeslot.module.css';

type TimeslotProps = {
  title: string;
  timeStamp: string;
};

const Timeslot = ({ title, timeStamp }: TimeslotProps) => {
  return (
    <>
      <div>
        <div className="title">{}</div>
      </div>
    </>
  );
};

export default Timeslot;
