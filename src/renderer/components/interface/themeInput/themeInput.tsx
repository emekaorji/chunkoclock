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
  handleChange: (_newValue: Theme) => void;
  className?: string;
  disabled?: boolean;
};
type EnabledThemeInputProps = {
  onChange: (_event: ThemeEvent) => void;
  disabled?: boolean;
};
type DisabledThemeInputProps = {
  onChange?: never;
  disabled: boolean;
};
type ThemeInputProps = (EnabledThemeInputProps | DisabledThemeInputProps) & {
  name?: string;
  value: Theme;
};

const Color = ({
  value,
  selected,
  className,
  handleChange,
  disabled = false,
}: ColorProps) => {
  const handleClick = () => {
    handleChange(value);
  };

  const isSelected = useMemo(() => value === selected, [selected, value]);

  return (
    <>
      <button
        type="button"
        className={`${styles.colorDiscs} ${styles[value]}${getClassName(
          !!className
        )}${getClassName(isSelected, styles.isSelected)}`}
        onClick={handleClick}
        disabled={disabled}
      >
        <div className={styles.primary} />
        <div className={styles.secondary} />
      </button>
    </>
  );
};
const ThemeInput = ({
  name = '',
  value,
  onChange,
  disabled = false,
}: ThemeInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleThemes = () => !disabled && setIsOpen(!isOpen);
  const closeThemes = () => setIsOpen(false);

  const handleChange = (newValue: Theme) => {
    if (!onChange) return;
    if (disabled) return;
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
        {!disabled && (
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
            <Color
              value="envoys"
              selected={value}
              handleChange={handleChange}
            />
            <Color
              value="vsaandpoe"
              selected={value}
              handleChange={handleChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export { Theme, ThemeEvent };
export default ThemeInput;
