import { FC, useEffect, useState } from 'react';

import classes from './Currencies.module.scss';
import currency from '../../assets/sprite.svg';

export const Currencies: FC = () => {
  const [date, setDate] = useState<string>('');

  const handlerDate = () => {
    const now = new Date();

    const mscDate = now
      .toLocaleString('ru-RU', {
        timeZone: 'Europe/Moscow',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/(\d+).(\d+).(\d+)/, '$1.$2.$3');

    setDate(mscDate);
  };

  useEffect(() => {
    handlerDate();
  }, []);

  return (
    <section className={classes.currencies}>
      <div className={classes.currencies__wrapper}>
        <h2 className={classes.currencies__title}>
          Exchange rate in internet bank
        </h2>
        <article className={classes.currencies__converter}>
          <h4 className={classes.currencies__converterTitle}>Currency</h4>
          <ul className={classes.currencies__list}></ul>
        </article>
        <button type="submit" className={classes.currencies__btn}>
          <span className={classes.currencies__btnText}>All courses</span>
        </button>
      </div>

      <div className={classes.currencies__dateWrapper}>
        <time className={classes.currencies__date}>
          Update every 15 minutes, MSC {date}
        </time>
        <svg className={classes.currencies__icon}>
          <use href={currency + '#currency'}></use>
        </svg>
      </div>
    </section>
  );
};
