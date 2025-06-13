import { FC } from 'react';
import { Features } from '../../components/Features/Features';

import classes from './HomePage.module.scss';

export const HomePage: FC = () => {
  return (
    <main className={classes.main}>
      <Features />
    </main>
  );
};
