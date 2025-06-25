import { useState, useEffect } from 'react';
import { newsApi } from '../API/api';

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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsApi.get('');
        setNews(response.data.articles);
      } catch (err) {
        setError('Failed to fetch news');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading, error };
};
