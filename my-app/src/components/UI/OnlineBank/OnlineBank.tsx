import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import classes from './OnlineBank.module.scss';

interface IOnlineBankProp {
  children: ReactNode;
  to: string;
  className: string;
}

export const OnlineBank: FC<IOnlineBankProp> = ({
  children,
  to,
  className,
}) => {
  return (
    <>
      <Link className={className} to={to}>
        {children}
      </Link>
    </>
  );
};
