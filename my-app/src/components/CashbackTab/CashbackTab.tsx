import { FC } from 'react';
import { CASHBACK_TAB } from '../../consts/consts';

import classes from './Cashback.module.scss';

export const CashbackTab: FC = () => {
  return (
    <section className={classes.cashback} aria-label="Cashback Terms">
      {CASHBACK_TAB.map((item, index) => (
        <article
          key={`cashback-${index}`}
          aria-labelledby={`cashback-title-${index}`}
          className={`${classes.cashback__wrapper} ${
            classes[`cashback__wrapper_${index}`]
          }`}
        >
          <h3 className={classes.cashback__title}>{item.title}</h3>
          <p className={classes.cashback__text}>{item.text}</p>
        </article>
      ))}
    </section>
  );
};
