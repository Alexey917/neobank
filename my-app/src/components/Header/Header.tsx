import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="#">NeoBank</NavLink>
          </li>
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
          <li></li>
        </ul>
      </nav>
    </header>
  );
};
