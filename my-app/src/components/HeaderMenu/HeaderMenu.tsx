import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../UI/Button/Button';
import { NavItem } from '../NavItem/NavItem';

import classes from './HeaderMenu.module.scss';

export const HeaderMenu: FC = () => {
  return (
    <nav className={classes.headerMenu} aria-label="Mobile navigation">
      <ul className={classes.headerMenu__list}>
        <NavItem to="creditCard">Credit card</NavItem>
        <NavItem to="product">Product</NavItem>
        <NavItem to="account">Account</NavItem>
        <NavItem to="resources">Resources</NavItem>
        <li>
          <Button
            as={Link}
            to="onlineBank"
            className={classes.link}
            aria-label="Online Bank"
          >
            <span className={classes.button_text}>Online Bank</span>
          </Button>
        </li>
      </ul>
    </nav>
  );
};
