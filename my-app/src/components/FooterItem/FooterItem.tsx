import { FC } from 'react';
import { Link } from 'react-router-dom';

import classes from './FooterItem.module.scss';

interface FooterItemProps {
  children: string;
  to: string;
}

export const FooterItem: FC<FooterItemProps> = ({ children, to }) => {
  return (
    <li className={classes.footer__item}>
      <Link to={to} className={classes.footer__link}>
        {children}
      </Link>
    </li>
  );
};
