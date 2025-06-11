import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

import classes from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Outlet />
    </div>
  );
};
