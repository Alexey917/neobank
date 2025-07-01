import { INews } from '../hooks/useFetchNews';

export const filterNews = async (newsArr: INews[]) => {
  const filtered = await Promise.all(
    newsArr.map(async (item) => {
      if (!item.urlToImage || !item.description) return null;

      const isValid = await new Promise<boolean>((resolve) => {
        const img = new Image();
        img.src = item.urlToImage!;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });

      return isValid ? item : null;
    }),
  );

  return filtered.filter(Boolean) as INews[];
};
