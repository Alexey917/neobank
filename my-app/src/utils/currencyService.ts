import axios from 'axios';

interface IOptions {
  url: string;
  accessKey: string;
  to: string;
  amount: number;
}

export async function currencyService(currency: string, options: IOptions) {
  const response = await axios.get(options.url, {
    params: {
      access_key: options.accessKey,
      from: currency,
      to: options.to,
      amount: options.amount,
    },
  });

  return response;
}
