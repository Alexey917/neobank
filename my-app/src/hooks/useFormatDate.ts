import { useState, useEffect } from 'react';

export const useFormatDate = (dateFor: boolean) => {
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Europe/Moscow',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };

    const formatted = now.toLocaleString('ru-RU', options);
    const newDate = dateFor
      ? formatted.replace(/(\d+).(\d+).(\d+)/, '$1.$2.$3')
      : formatted.replace(/(\d+).(\d+).(\d+)/, '$3-$2-$1');

    setDate(newDate);
  }, [dateFor]);

  return { date };
};
