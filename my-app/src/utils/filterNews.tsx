import { INews } from '../hooks/useFetchNews';

export const filterNews = (newsArr: INews[]) => {
  const check = newsArr.map(async (item) => {
    const response = await fetch(item.urlToImage);
    console.log(response.status);
    return response.status;
  });

  console.log(check);

  return newsArr.filter(
    (item) => item.urlToImage !== null && item.description !== null,
  );
};
