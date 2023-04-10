import styles from './themeInput.module.css';

type ColorDiscsProps = {
  type: string;
};
const ColorDiscs = ({ type }: ColorDiscsProps) => {
  return (
    <>
      <div className={`${styles.colorDiscs} ${styles[type.toLowerCase()]}`}>
        <div />
        <div />
      </div>
    </>
  );
};
const Color = {
  Monotone: () => <ColorDiscs type="monotone" />,
  Blue: () => <div className={`${styles.color} ${styles.red}`} />,
  Green: () => <div className={`${styles.color} ${styles.red}`} />,
};

const ThemeInput = () => {
  return (
    <>
      <div>
        <button type="button">
          <Color.Monotone />
        </button>
      </div>
    </>
  );
};

export default ThemeInput;

/**
 * Name BackgroundColor TextColor
 * Monotone #000000 #FFFFFF
 * Brain Sprain #E0C022 #000000
 * Liquid Stone #008000 #FFFFFF
 * Curly Stick
 * Tall Dwarf
 * VSA & POE
 */
