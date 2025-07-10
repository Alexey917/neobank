import axios, { AxiosInstance } from 'axios';

export const currencyApi: AxiosInstance | null =
  import.meta.env.VITE_CURRENCY_URL && import.meta.env.VITE_CURRENCY_KEY
    ? axios.create({
        baseURL: `${import.meta.env.VITE_CURRENCY_URL}/${
          import.meta.env.VITE_CURRENCY_KEY
        }`,
        headers: { 'Content-Type': 'text/plain' },
      })
    : null;

export const newsApi: AxiosInstance | null =
  import.meta.env.VITE_NEWS_URL && import.meta.env.VITE_NEWS_KEY
    ? axios.create({
        baseURL: `${import.meta.env.VITE_NEWS_URL}/v2/top-headlines`,
        params: {
          country: 'us',
          category: 'business',
          apiKey: import.meta.env.VITE_NEWS_KEY,
        },
      })
    : null;

export const getNews: AxiosInstance | null = import.meta.env.VITE_GET_NEWS_URL
  ? axios.create({
      baseURL: `${import.meta.env.VITE_GET_NEWS_URL}/email`,
    })
  : null;
