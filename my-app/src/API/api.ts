import axios, { AxiosInstance } from 'axios';
import { IOffer } from 'src/types/types';

let currencyApi: AxiosInstance | undefined;
let apiError: string | undefined;

export const initializeCurrencyApi = () => {
  try {
    if (!import.meta.env.VITE_CURRENCY_URL) {
      throw new Error('VITE_CURRENCY_URL не задан');
    }
    if (!import.meta.env.VITE_CURRENCY_KEY) {
      throw new Error('VITE_CURRENCY_KEY не задан');
    }

    currencyApi = axios.create({
      baseURL: import.meta.env.VITE_CURRENCY_URL,
      headers: {
        'Content-Type': 'text/plain',
        'Accept': '*/*',
      },
      withCredentials: false,
    });

    return true;
  } catch (error) {
    apiError =
      error instanceof Error
        ? error.message
        : 'Неизвестная ошибка инициализации';
    return false;
  }
};

export const getCurrency = async (currency: string, to: string) => {
  if (!currencyApi) {
    throw new Error(apiError || 'Currency API не инициализирован');
  }

  return currencyApi.get(
    `/v6/${import.meta.env.VITE_CURRENCY_KEY}/pair/${currency}/${to}`,
  );
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

export const adminApi: AxiosInstance | null = import.meta.env.VITE_GET_NEWS_URL
  ? axios.create({
      baseURL: `${import.meta.env.VITE_GET_NEWS_URL}/admin/application`,
    })
  : null;

export const applicationStatus = async (id: number) => {
  if (!adminApi) {
    throw new Error();
  }

  const response = await adminApi?.get(`/${id}`);

  return response;
};

export const applyApi: AxiosInstance | null = import.meta.env.VITE_GET_NEWS_URL
  ? axios.create({
      baseURL: `${import.meta.env.VITE_GET_NEWS_URL}/application/apply`,
    })
  : null;

export const selectedOffer = async (offer: IOffer) => {
  if (!applyApi) {
    throw new Error();
  }

  const response = await applyApi?.post('', offer);

  return response;
};
