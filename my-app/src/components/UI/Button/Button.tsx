import React, { FC, ReactNode } from 'react';

import classes from './Button.module.scss';

interface IButton {
  children: ReactNode;
  styleBtn: string;
}

export const Button: FC<IButton> = ({ children, styleBtn }) => {
  return (
    <>
      <button type="button" className={classes[styleBtn]}>
        {children}
      </button>
    </>
  );
};
