import React, { useState } from 'react';
import getClassName from 'renderer/functions/getClassName';
import styles from './smallButton.module.css';

type ButtonProps = {
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SmallButton = ({ children, className, ...props }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <>
      <button
        type="button"
        className={
          styles.button +
          getClassName(className) +
          getClassName(isPressed, styles.isPressed)
        }
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default SmallButton;
