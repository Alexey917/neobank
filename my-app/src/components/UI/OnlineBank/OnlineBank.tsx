import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import classes from './OnlineBank.module.scss';

interface IOnlineBankProp {
  children: ReactNode;
  to: string;
}

export const OnlineBank: FC<IOnlineBankProp> = ({ children, to }) => {
  return (
    <>
      <Link className={classes.link} to={to}>
        {children}
      </Link>
    </>
  );
};
