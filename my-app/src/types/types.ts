import { AxiosInstance } from 'axios';

export type TApi = AxiosInstance | null;

export type TBody = IGetNews;

interface IGetNews {
  email: string;
}
