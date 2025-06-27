import { INews } from 'src/hooks/useFetchNews';

export const filterNews = (newsArr: INews[]) => {
  return newsArr.filter(
    (item) => item.urlToImage !== null && item.description !== null,
  );
};
