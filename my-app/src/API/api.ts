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
