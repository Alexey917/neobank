import { FC } from 'react';
import { INews } from 'src/hooks/useFetchNews';

import classes from './NewsItem.module.scss';

export const NewsItem: FC<INews> = ({
  url,
  urlToImage,
  title,
  description,
}) => {
  return (
    <li>
      <a href={url} target="_blank" className={classes.news__link}>
        <img className={classes.news__img} src={urlToImage} alt={title} />
        <h4 className={classes.news__linkTitle}>{title}</h4>
        <p className={classes.news__description}>{description}</p>
      </a>
    </li>
  );
};
