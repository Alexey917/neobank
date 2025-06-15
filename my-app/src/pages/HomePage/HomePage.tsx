import { FC } from 'react';
import { Features } from '../../components/Features/Features';
import { Anywhere } from '../../components/Anywhere/Anywhere';
import { Currencies } from '../../components/Currencies/Currencies';
import { ChooseCard } from '../../components/ChooseCard/ChooseCard';
import { Support } from '../../components/Support/Support';

import classes from './HomePage.module.scss';

export const HomePage: FC = () => {
  return (
    <main className={classes.main}>
      <ChooseCard />
      <Features />
      <Currencies />
      <Anywhere />
      <Support />
    </main>
  );
};
