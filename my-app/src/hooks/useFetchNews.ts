import { useState, useEffect } from 'react';
import { useFormatDate } from '../hooks/useFormatDate';
import { newsApi } from '../API/api';
import { filterNews } from '../utils/filterNews';
import { UPDATE_INTERVAL } from './useFetchCurrencies';

export interface INews {
  urlToImage: string;
  url: string;
  title: string;
  description: string;
}

export const useFetchNews = () => {
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { date } = useFormatDate(false);

  useEffect(() => {
    if (!date) return;

    const fetchNews = async (quantity: string) => {
      try {
        setLoading(true);
        const response = await newsApi?.get('', {
          params: {
            pageSize: quantity,
            from: date,
          },
        });
        // console.log(response?.data.articles);
        // console.log(filterNews(response?.data.articles));
        setNews(filterNews(response?.data.articles));
      } catch (err) {
        setError('Failed to fetch news');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews('15');
    const interval = setInterval(fetchNews, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [date]);

  return { news, loading, error };
};
