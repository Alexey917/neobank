import { FC } from 'react';

import classes from './Anywhere.module.scss';
import world from '../../assets/images/world.png';

export const Anywhere: FC = () => {
  return (
    <section className={classes.anywhere} aria-labelledby="anywhere-heading">
      <h3 className={classes.anywhere__title} id="anywhere-heading">
        You can use our services anywhere in the world
      </h3>
      <p className={classes.anywhere__text}>
        Withdraw and transfer money online through our application
      </p>
      <figure className={classes.anywhere__imgWrapper}>
        <img
          src={world}
          alt="World map with service coverage highlights"
          className={classes.anywhere__img}
        />
      </figure>
    </section>
  );
};
