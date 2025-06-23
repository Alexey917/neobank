import { FC } from 'react';

import classes from './Currencies.module.scss';
import currency from '../../assets/sprite.svg';
import { useFetchCurrencies } from '../../hooks/useFetchCurrencies';

export const Currencies: FC = () => {
  const { convertCurrencies, isLoading, error, date } = useFetchCurrencies();

  return (
    <section
      className={classes.currencies}
      aria-labelledby="currencies-heading"
    >
      <div className={classes.currencies__wrapper}>
        <h2 className={classes.currencies__title} id="currencies-heading">
          Exchange rate in internet bank
        </h2>
        <article className={classes.currencies__converter}>
          <h4 className={classes.currencies__converterTitle}>Currency</h4>
          {isLoading ? (
            <div aria-label="Loading currency rates">Loading...</div>
          ) : error ? (
            <div className={classes.error}>{error}</div>
          ) : (
            <ul
              className={classes.currencies__list}
              aria-label="Currency rates"
            >
              {convertCurrencies.map((item) => (
                <li key={item.currency} className={classes.currencies__item}>
                  <span className={classes.currencies__name}>
                    {item.currency}:
                  </span>
                  <span className={classes.currencies__rate}>{item.rate}</span>
                </li>
              ))}
            </ul>
          )}
        </article>
        <a
          href="https://alfaforex.ru/analytics/analytics-currencies/"
          className={classes.currencies__btn}
          aria-label="View all currency rates"
        >
          <span className={classes.currencies__btnText}>All courses</span>
        </a>
      </div>

      <div className={classes.currencies__dateWrapper}>
        <time
          className={classes.currencies__date}
          dateTime={new Date().toISOString()}
        >
          Update every 15 minutes, MSC {date}
        </time>
        <svg className={classes.currencies__icon} aria-hidden="true">
          <use href={currency + '#currency'}></use>
        </svg>
      </div>
    </section>
  );
};
