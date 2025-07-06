import { FC } from 'react';
import { CustomLink } from '../UI/CustomLink/CustomLink';
import { LINK_LIST } from '../Header/Header';

import classes from './HeaderMenu.module.scss';

export const HeaderMenu: FC = () => {
  return (
    <nav className={classes.headerMenu} aria-label="Mobile navigation">
      <ul className={classes.headerMenu__list}>
        {LINK_LIST.map((link) => (
          <li>
            <CustomLink to="loan" variant="header" paddings="pNav">
              {link}
            </CustomLink>
          </li>
        ))}
        <li>
          <CustomLink
            aria-label="Online Bank"
            to="onlineBank"
            variant="primary"
            paddings="pPrimary"
            type="mobile"
          >
            <span className={classes.button_text}>Online Bank</span>
          </CustomLink>
        </li>
      </ul>
    </nav>
  );
};
