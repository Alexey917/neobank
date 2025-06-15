const [date, setDate] = useState<string>('');

const formatDate = () => {
  const now = new Date();

  const mscDate = now
    .toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/(\d+).(\d+).(\d+)/, '$1.$2.$3');

  setDate(mscDate);
};
