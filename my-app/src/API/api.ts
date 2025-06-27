import axios from 'axios';

if (!import.meta.env.VITE_CURRENCY_URL || !import.meta.env.VITE_CURRENCY_KEY) {
  throw new Error('API configuration is missing!');
}

export const currencyApi = axios.create({
  baseURL: `${import.meta.env.VITE_CURRENCY_URL}/${
    import.meta.env.VITE_CURRENCY_KEY
  }`,

  headers: { 'Content-Type': 'text/plain' },
});

//https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=10&from=2025-06-24&apiKey=b79edb47e2804310ae10916cac2ffb0a

export const newsApi = axios.create({
  baseURL: `${import.meta.env.VITE_NEWS_URL}`,
  params: {
    country: 'us',
    category: 'business',
    apiKey: import.meta.env.VITE_NEWS_KEY,
  },
});
