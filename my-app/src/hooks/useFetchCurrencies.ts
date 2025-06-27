import { useState, useEffect } from 'react';
import { currencyApi } from '../API/api';
import { useFormatDate } from '../hooks/useFormatDate';

const CURRENCIES = ['USD', 'EUR', 'TRY', 'CNY', 'CHF', 'JPY'];

const ALL_CURRENCIES = ['AUD', 'CAD', 'KZT', 'PLN', 'SAR', 'SEK'];

const UPDATE_INTERVAL = 15 * 60 * 1000;

interface IConvertCurrencies {
  currency: string;
  rate: string;
}

export const useFetchCurrencies = () => {
  const [convertCurrencies, setConvertCurrencies] = useState<
    IConvertCurrencies[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { date } = useFormatDate(true);

  const fetchCurrencies = async (to = 'RUB') => {
    setIsLoading(true);
    setError('');

    const results: IConvertCurrencies[] = [];

    for (const currency of CURRENCIES) {
      try {
        // const response = await currencyApi.get(`/pair/${currency}/${to}`);
        results.push({
          currency,
          rate: response.data.conversion_rate?.toFixed(2) || 'N/A',
        });
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
    fetchCurrencies(); // Первый запрос сразу
    const interval = setInterval(fetchCurrencies, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { convertCurrencies, isLoading, error, date };
};
