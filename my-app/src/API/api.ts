import axios, { AxiosInstance } from 'axios';

export const currencyApi: AxiosInstance | null =
  import.meta.env.VITE_CURRENCY_URL && import.meta.env.VITE_CURRENCY_KEY
    ? axios.create({
        baseURL: `${import.meta.env.VITE_CURRENCY_URL}`,
        headers: {
          'Content-Type': 'text/plain',
          'Accept': '*/*',
        },
        withCredentials: false,
      })
    : null;

export const getCurrency = async (currency: string, to: string) => {
  if (!currencyApi) {
    throw new Error();
  }

  const response = await currencyApi?.get(
    `/v6/${import.meta.env.VITE_CURRENCY_KEY}/pair/${currency}/${to}`,
  );
  return response;
};

export const newsApi: AxiosInstance | null =
  import.meta.env.VITE_NEWS_URL && import.meta.env.VITE_NEWS_KEY
    ? axios.create({
        baseURL: `${import.meta.env.VITE_NEWS_URL}`,
      })
    : null;

export const getNews = async () => {
  if (!newsApi) {
    throw new Error();
  }

  const response = await newsApi?.get(
    `/v2/top-headlines/business/country/${import.meta.env.VITE_NEWS_KEY}`,
  );

  return response;
};

export const subscribeApi: AxiosInstance | null = import.meta.env
  .VITE_GET_NEWS_URL
  ? axios.create({
      baseURL: `${import.meta.env.VITE_GET_NEWS_URL}/email`,
    })
  : null;

export const getSubscription = async () => {
  if (!newsApi) {
    throw new Error();
  }

  const response = await newsApi?.get(
    `/v2/top-headlines/business/country/${import.meta.env.VITE_NEWS_KEY}`,
  );

  return response;
};

export const sendCustomizeForm: AxiosInstance | null = import.meta.env
  .VITE_GET_NEWS_URL
  ? axios.create({
      baseURL: `${import.meta.env.VITE_GET_NEWS_URL}/application`,
    })
  : null;
