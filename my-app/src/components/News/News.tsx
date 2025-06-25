import { useRef, useState, useEffect } from 'react';
import { NewsSliderButton } from '../UI/NewsSliderButtons/NewsSliderButtons';
import { useFetchNews } from '../../hooks/useFetchNews';
import { NewsItem } from '../NewsItem/NewsItem';

import classes from './News.module.scss';

const START_POSITION = 0;

export const News = () => {
  const { news, loading, error } = useFetchNews();
  const newsRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState<number>(START_POSITION);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [gap, setGap] = useState<number>(0);
  const [isPrev, setIsPrev] = useState<boolean>(true);
  const [isNext, setIsNext] = useState<boolean>(false);

  useEffect(() => {
    if (newsRef.current && news.length > 0) {
      // Получаем ширину первого слайда
      const firstSlide = newsRef.current.firstChild as HTMLElement;
      if (firstSlide) {
        setSlideWidth(firstSlide.offsetWidth);

        // Получаем гэп (в пикселях)
        const computedStyle = window.getComputedStyle(newsRef.current);
        setGap(parseInt(computedStyle.gap) || 0);
      }
    }
  }, [news, newsRef.current]);

  // Вычисляем последнюю позицию
  const LAST_POSITION = -(slideWidth * (news.length - 1) - gap);

  const scrollSliderRight = () => {
    setPosition((prevPosition) => {
      const newPosition = prevPosition - 500;
      newsRef.current?.style.setProperty(
        'transform',
        `translateX(${newPosition}px)`,
      );
      newPosition >= START_POSITION ? setIsPrev(true) : setIsPrev(false);
      newPosition <= LAST_POSITION ? setIsNext(true) : setIsNext(false);
      return newPosition;
    });
  };

  const scrollSliderLeft = () => {
    setPosition((prevPosition) => {
      const newPosition = prevPosition + 500;
      newsRef.current?.style.setProperty(
        'transform',
        `translateX(${newPosition}px)`,
      );
      newPosition >= START_POSITION ? setIsPrev(true) : setIsPrev(false);
      newPosition <= LAST_POSITION ? setIsNext(true) : setIsNext(false);
      return newPosition;
    });
  };

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
        <div aria-label="Loading news" aria-busy="true">
          Loading...
        </div>
      ) : error ? (
        <div className={classes.error} role="alert">
          {error}
        </div>
      ) : news.length === 0 ? (
        <div className={classes.empty}>No news available</div>
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
