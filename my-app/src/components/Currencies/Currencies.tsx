import { FC, useEffect, useState } from 'react';
import { currencyService } from '../../utils/currencyService';

import classes from './Currencies.module.scss';
import currency from '../../assets/sprite.svg';

const CURRENCIES = ['USD', 'EUR', 'TRY', 'CNY', 'CHF', 'JPY'];

const API_OPTIONS = {
  url: 'https://api.exchangerate.host/convert',
  accessKey: '3e54757659fbd84c0609d00c61cece96',
  to: 'RUB',
  amount: 1,
};

const UPDATE_INTERVAL = 15 * 60 * 1000;

interface IConvertCurrencies {
  currency: string;
  rate: string;
}

export const Currencies: FC = () => {
  const [date, setDate] = useState<string>('');
  const [convertCurrencies, setConvertCurrencies] = useState<
    IConvertCurrencies[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const formatDate = () => {
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

  // const fetchCurrencies = async () => {
  //   setIsLoading(true);
  //   setError('');

  //   try {
  //     const results = await Promise.all(
  //       currencies.map(async (currency) => {
  //         try {
  //           const response = await currencyService(currency, options);
  //           return {
  //             currency,
  //             rate: response.data.result?.toFixed(2) || 'Нет данных',
  //           };
  //         } catch (e) {
  //           console.error(`Ошибка для ${currency}:`, e);
  //           return {
  //             currency,
  //             rate: 'Ошибка',
  //           };
  //         }
  //       }),
  //     );

  //     setConvertCurrencies(results);
  //   } catch (e) {
  //     setError('Ошибка при загрузке курсов валют');
  //     console.error('Ошибка:', e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchCurrencies = async () => {
    setIsLoading(true);
    setError('');

    const results: IConvertCurrencies[] = [];

    for (const currency of CURRENCIES) {
      try {
        const response = await currencyService(currency, API_OPTIONS);
        results.push({
          currency,
          rate: response.data.result?.toFixed(2) || 'N/A',
        });
        // Добавляем задержку между запросами
        await new Promise((resolve) => setTimeout(resolve, 2500));
      } catch (e) {
        setError('Failed to load currency rates');
        console.error('Fetch error:', e);
        results.push({
          currency,
          rate: 'Error',
        });
      }
    }

    setConvertCurrencies(results);
    setIsLoading(false);
  };

  useEffect(() => {
    formatDate();
    fetchCurrencies(); // Первый запрос сразу
    const interval = setInterval(fetchCurrencies, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

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
        <button
          type="submit"
          className={classes.currencies__btn}
          aria-label="View all currency rates"
        >
          <span className={classes.currencies__btnText}>All courses</span>
        </button>
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
