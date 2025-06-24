import { NewsSliderButton } from '../UI/NewsSliderButtons/NewsSliderButtons';
import { useFetchNews } from '../../hooks/useFetchNews';

import classes from './News.module.scss';

export const News = () => {
  const { news, loading, error } = useFetchNews();

  return (
    <section className={classes.news} aria-labelledby="news-heading">
      <h3 className={classes.news__title} id="news-heading">
        Current news from the world of finance
      </h3>
      <p className={classes.news__text}>
        We update the news feed every 15 minutes. You can learn more by clicking
        on the news you are interested in.
      </p>

      <ul className={classes.news__sliderWrapper}>
        {news.map((item) => (
          <li key={item.url}>
            <a href={item.url} target="_blank" className={classes.news__link}>
              <img
                className={classes.news__img}
                src={item.urlToImage}
                alt={item.urlToImage}
              />
              <h4 className={classes.news__linkTitle}>{item.title}</h4>
              <p className={classes.news__description}>{item.description}</p>
            </a>
          </li>
        ))}
      </ul>
      <NewsSliderButton />
    </section>
  );
};
