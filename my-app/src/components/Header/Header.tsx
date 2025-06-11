import { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '../UI/Button/Button';

import classes from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.header__list}>
          <li>
            <Link to="#">NeoBank</Link>
          </li>

          <li>
            <ul className={classes.header__list_inside}>
              <li>
                <NavLink to="#">Credit card</NavLink>
              </li>
              <li>
                <NavLink to="#">Product</NavLink>
              </li>
              <li>
                <NavLink to="#">Account</NavLink>
              </li>
              <li>
                <NavLink to="#">Resources</NavLink>
              </li>
            </ul>
          </li>

          <li>
            <Button styleBtn="button_bank">
              <span className={classes.button_text}>Online Bank</span>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
