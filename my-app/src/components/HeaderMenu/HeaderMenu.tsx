import { FC } from 'react';
import { OnlineBank } from '../UI/OnlineBank/OnlineBank';
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
          <OnlineBank
            aria-label="Online Bank"
            to="onlineBank"
            className={classes.link}
          >
            <span className={classes.button_text}>Online Bank</span>
          </OnlineBank>
        </li>
      </ul>
    </nav>
  );
};
