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

//https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=10&from=2025-06-24&apiKey=b79edb47e2804310ae10916cac2ffb0a

export const newsApi: AxiosInstance | null =
  import.meta.env.VITE_NEWS_URL && import.meta.env.VITE_NEWS_KEY
    ? axios.create({
        baseURL: `${import.meta.env.VITE_NEWS_URL}`,
        params: {
          country: 'us',
          category: 'business',
          apiKey: import.meta.env.VITE_NEWS_KEY,
        },
      })
    : null;
