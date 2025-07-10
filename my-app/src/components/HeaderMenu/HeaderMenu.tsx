import { FC } from 'react';
import { CustomLink } from '../UI/CustomLink/CustomLink';
import { LINKS } from '../Header/Header';

import classes from './HeaderMenu.module.scss';

export const HeaderMenu: FC = () => {
  return (
    <nav className={classes.headerMenu} aria-label="Mobile navigation">
      <ul className={classes.headerMenu__list}>
        {Object.entries(LINKS).map(([key, value]) => (
          <li>
            <CustomLink to={value} variant="header" paddings="pNav">
              {key}
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
