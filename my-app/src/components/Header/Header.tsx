import { NavLink, Link } from 'react-router-dom';

import classes from './Header.module.scss';

export const Header = () => {
  return (
    <header>
      <nav>
        <ul className={classes.header__list}>
          <li>
            <Link to="#">NeoBank</Link>
          </li>

          <li>
            <ul>
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

          <li></li>
        </ul>
      </nav>
    </header>
  );
};
