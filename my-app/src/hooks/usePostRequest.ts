import { useState } from 'react';
import { TApi, TBody } from '../types/types';

export const usePostRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const axiosPost = async (api: TApi, body: TBody) => {
    try {
      setLoading(true);
      const response = await api?.post('', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (err) {
      setError('Failed request');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { axiosPost, loading, error };
};
