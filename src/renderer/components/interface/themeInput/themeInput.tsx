import getClassName from 'renderer/functions/getClassName';
import { MouseEventHandler, useState } from 'react';
import { ClickEventProp } from 'renderer/types/eventTypes';
import styles from './themeInput.module.css';

type ColorDiscsProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const ColorDiscs = ({ className, onClick }: ColorDiscsProps) =>
  function (theme: string) {
    const handleClick = (event: ClickEventProp) => {
      if (typeof onClick === 'function') onClick(event);
    };

    return (
      <>
        <button
          type="button"
          className={`${styles.colorDiscs} ${styles[theme]}${getClassName(
            className
          )}`}
          onClick={handleClick}
        >
          <div className={styles.primary} />
          <div className={styles.secondary} />
        </button>
      </>
    );
  };

interface IColor {
  [key: string]: (props: ColorDiscsProps) => JSX.Element;
}

const Color: IColor = {
  Monotone: (props) => ColorDiscs(props)('monotone'),
  BrainSprain: (props) => ColorDiscs(props)('brainsprain'),
  LiquidStone: (props) => ColorDiscs(props)('liquidstone'),
  CurlyStick: (props) => ColorDiscs(props)('curlystick'),
  TallDwarf: (props) => ColorDiscs(props)('talldwarf'),
  Envoys: (props) => ColorDiscs(props)('envoys'),
  VSAandPOE: (props) => ColorDiscs(props)('vsaandpoe'),
};

const ThemeInput = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleThemes = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={styles.themeContainer}>
        <Color.Monotone className={styles.placeholder} onClick={toggleThemes} />
        <div className={styles.themes + getClassName(isOpen, styles.isOpen)}>
          <Color.Monotone onClick={() => {}} />
          <Color.BrainSprain onClick={() => {}} />
          <Color.LiquidStone onClick={() => {}} />
          <Color.CurlyStick onClick={() => {}} />
          <Color.TallDwarf onClick={() => {}} />
          <Color.Envoys onClick={() => {}} />
          <Color.VSAandPOE onClick={() => {}} />
        </div>
      </div>
    </>
  );
};

export default ThemeInput;

/**
 * Name Primary Secondary
 * Monotone #000000 #FFFFFF
 * Brain Sprain #E0C022 #000000
 * Liquid Stone #020E12 #98AD06
 * Curly Stick #040518 #E89B19
 * Tall Dwarf #B9BAC5 #4440B3
 * Envoys #B9BAC5 #008000
 * VSA & POE #4DA8D5 #04053E
 */
