import { useRef, FC } from 'react';
import { NewsSliderButton } from '../UI/NewsSliderButtons/NewsSliderButtons';
import { useFetchNews } from '../../hooks/useFetchNews';
import { NewsItem } from '../NewsItem/NewsItem';
import { useSlider } from '../../hooks/useSlider';
import { useAdaptiveSlider } from '../../hooks/useAdaptiveSlider';
import { Loader } from '../UI/Loader/Loader';

import classes from './News.module.scss';

export const News: FC = () => {
  const { news, loading, error } = useFetchNews();
  const newsRef = useRef<HTMLUListElement>(null);

  const { lastPosition, sliderOffset } = useAdaptiveSlider(newsRef, news);

  const { scrollSliderRight, scrollSliderLeft, isPrev, isNext } = useSlider(
    sliderOffset,
    lastPosition,
    newsRef,
  );

  return (
    <section className={classes.news} aria-labelledby="news-heading">
      <h3 className={classes.news__title} id="news-heading">
        Current news from the world of finance
      </h3>
      <p className={classes.news__text}>
        We update the news feed every 15 minutes. You can learn more by clicking
        on the news you are interested in.
      </p>

      {loading ? (
        <div
          aria-label="Loading news"
          aria-busy="true"
          className={classes.news__spinner_wrapper}
        >
          <Loader />
        </div>
      ) : error ? (
        <div className={classes.news__error} role="alert">
          {error}
        </div>
      ) : news.length === 0 ? (
        <div className={classes.news__empty}>No news available</div>
      ) : (
        <ul
          className={classes.news__sliderWrapper}
          id="news-list"
          ref={newsRef}
        >
          {news.map((item) => (
            <NewsItem {...item} key={item.url} />
          ))}
        </ul>
      )}

      <NewsSliderButton
        aria-label="Scroll news"
        aria-controls="news-list"
        scrollSliderRight={scrollSliderRight}
        scrollSliderLeft={scrollSliderLeft}
        isPrev={isPrev}
        isNext={isNext}
      />
    </section>
  );
};
