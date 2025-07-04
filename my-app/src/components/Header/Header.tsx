import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { OnlineBank } from '../UI/OnlineBank/OnlineBank';
import { NavItem } from '../NavItem/NavItem';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';

import classes from './Header.module.scss';
import menu from '../../assets/sprite.svg';
import close from '../../assets/sprite.svg';

export const Header: FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [menuIcon, setMenuIcon] = useState<string>(menu);

  const openMobileMenu = () => {
    if (!menuIsOpen) {
      setMenuIsOpen(true);
      setMenuIcon(close);
    } else {
      setMenuIsOpen(false);
      setMenuIcon(menu);
    }
  };

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
            <OnlineBank
              aria-label="Online Bank"
              to="onlineBank"
              className={classes.link}
            >
              <span className={classes.button_text}>Online Bank</span>
            </OnlineBank>
          </li>

          <li className={classes.header__menu_item}>
            <button
              type="button"
              className={classes.header__menu_btn}
              onClick={() => openMobileMenu()}
            >
              <svg
                className={
                  menuIsOpen
                    ? classes.header__closeMenu_icon
                    : classes.header__openMenu_icon
                }
              >
                <use
                  href={`${menuIcon}#${!menuIsOpen ? 'menu' : 'close'}`}
                ></use>
              </svg>
            </button>
          </li>
        </ul>
      </nav>

      {menuIsOpen ? <HeaderMenu /> : ''}
    </header>
  );
};
