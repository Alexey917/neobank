import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItem.module.scss';

interface NavItemProps {
  children: string;
  to: string;
}

export const NavItem: FC<NavItemProps> = ({ children, to }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? `${classes.header__link_active} ${classes.header__link}`
            : classes.header__link
        }
      >
        {children}
      </NavLink>
    </li>
  );
};
