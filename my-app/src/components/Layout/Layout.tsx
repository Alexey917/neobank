import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

import { Footer } from '../Footer/Footer';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
