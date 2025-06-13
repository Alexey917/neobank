import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../UI/Button/Button';
import { NavItem } from '../NavItem/NavItem';

import classes from './Header.module.scss';
import menu from '../../assets/sprite.svg';

export const Header: FC = () => {
  return (
    <header className={classes.header}>
      <nav aria-label="Main navigation">
        <ul className={classes.header__list}>
          <li>
            <Link to="/" className={classes.header__logo} aria-label="Home">
              NeoBank
            </Link>
          </li>

          <li>
            <ul className={classes.header__list_inside}>
              <NavItem to="creditCard">Credit card</NavItem>
              <NavItem to="product">Product</NavItem>
              <NavItem to="account">Account</NavItem>
              <NavItem to="resources">Resources</NavItem>
            </ul>
          </li>

          <li>
            <Button styleBtn="button_bank" aria-label="Online Bank">
              <span className={classes.button_text}>Online Bank</span>
            </Button>
          </li>

          <li className={classes.header__menu_item}>
            <button type="button" className={classes.header__menu_btn}>
              <svg className={classes.header__menu_icon}>
                <use href={menu + '#menu'}></use>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
