import { useState, useEffect } from 'react';
import { currencyService } from '../utils/currencyService';
import { useFormatDate } from '../hooks/useFormatDate';

const CURRENCIES = ['USD', 'EUR', 'TRY', 'CNY', 'CHF', 'JPY'];

const API_OPTIONS = {
  url: 'https://api.exchangerate.host/convert',
  accessKey: '7489c6fddef20d874fb66def6d8902fc', //7489c6fddef20d874fb66def6d8902fc, 3e54757659fbd84c0609d00c61cece96
  to: 'RUB',
  amount: 1,
};

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

  const { date, formatDate } = useFormatDate();

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

  return { convertCurrencies, isLoading, error, date };
};
