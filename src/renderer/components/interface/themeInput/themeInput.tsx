import getClassName from 'renderer/functions/getClassName';
import { useMemo, useRef, useState } from 'react';
import useOnClickOutside from 'renderer/hooks/view/useOnClickOutside';
import styles from './themeInput.module.css';

type Theme =
  | 'monotone'
  | 'brainsprain'
  | 'liquidstone'
  | 'curlystick'
  | 'talldwarf'
  | 'envoys'
  | 'vsaandpoe';
interface ThemeEvent {
  target: {
    name: string;
    value: Theme;
  };
}

type ColorProps = {
  value: Theme;
  selected?: Theme;
  handleChange: (newValue: Theme) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
type ThemeInputProps = {
  name?: string;
  value: Theme;
  onChange: (event: ThemeEvent) => void;
};

const Color = ({ value, selected, className, handleChange }: ColorProps) => {
  const handleClick = () => {
    handleChange(value);
  };

  const isSelected = useMemo(() => value === selected, [selected, value]);

  return (
    <>
      <button
        type="button"
        className={`${styles.colorDiscs} ${styles[value]}${getClassName(
          className
        )}${getClassName(isSelected, styles.isSelected)}`}
        onClick={handleClick}
      >
        <div className={styles.primary} />
        <div className={styles.secondary} />
      </button>
    </>
  );
};
const ThemeInput = ({ name = '', value, onChange }: ThemeInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleThemes = () => setIsOpen(!isOpen);
  const closeThemes = () => setIsOpen(false);

  const handleChange = (newValue: Theme) => {
    const customEvent = {
      target: {
        name,
        value: newValue,
      },
    };
    onChange(customEvent);
  };

  useOnClickOutside(containerRef, closeThemes);

  return (
    <>
      <div className={styles.themeContainer} ref={containerRef}>
        <Color
          value={value}
          className={styles.placeholder}
          handleChange={toggleThemes}
        />
        <div className={styles.themes + getClassName(isOpen, styles.isOpen)}>
          <Color
            value="monotone"
            selected={value}
            handleChange={handleChange}
          />
          <Color
            value="brainsprain"
            selected={value}
            handleChange={handleChange}
          />
          <Color
            value="liquidstone"
            selected={value}
            handleChange={handleChange}
          />
          <Color
            value="curlystick"
            selected={value}
            handleChange={handleChange}
          />
          <Color
            value="talldwarf"
            selected={value}
            handleChange={handleChange}
          />
          <Color value="envoys" selected={value} handleChange={handleChange} />
          <Color
            value="vsaandpoe"
            selected={value}
            handleChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export { Theme, ThemeEvent };
export default ThemeInput;
