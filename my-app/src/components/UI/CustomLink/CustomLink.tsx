import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import classes from './CustomLink.module.scss';

type linkVariant = 'primary' | 'header' | 'footer';
type linkPaddings = 'pNav' | 'pPrimary';
type linkDisplay = 'mobile';

export interface ICustomLink {
  children: string | ReactNode;
  to: string;
  paddings: linkPaddings;
  variant: linkVariant;
  type?: linkDisplay;
}

export const CustomLink: FC<ICustomLink> = ({
  children,
  to,
  paddings,
  variant,
  type,
}) => {
  return (
    <>
      <Link
        className={`${classes[variant]} ${classes[paddings]} ${
          type && classes[type]
        }`}
        to={to}
      >
        {children}
      </Link>
    </>
  );
};
