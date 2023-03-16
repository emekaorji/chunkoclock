import React from 'react';
import getClassName from 'renderer/functions/getClassName';
import styles from './smallButton.module.css';

type ButtonProps = {
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SmallButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <>
      <button
        type="button"
        className={styles.button + getClassName(className)}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default SmallButton;
