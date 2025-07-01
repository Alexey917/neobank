import { useState, useEffect, RefObject, useCallback } from 'react';
import { INews } from './useFetchNews';

const BREAKPOINTS = {
  DESKTOP: 1300,
  TABLET: 920,
  MOBILE: 500,
};

const DEFAULT_OFFSETS = {
  DESKTOP: 500,
  MOBILE: 350,
};

export const useAdaptiveSlider = (
  ref: RefObject<HTMLUListElement | null>,
  news: INews[],
) => {
  const [slideWidth, setSlideWidth] = useState(0);
  const [gap, setGap] = useState(0);
  const [sliderOffset, setSliderOffset] = useState(DEFAULT_OFFSETS.DESKTOP);
  const [lastPosition, setLastPosition] = useState(0);

  const getBaseLastPosition = useCallback(() => {
    console.log('ширина слайда:', slideWidth);
    console.log('отступ между слайдами:', gap);
    console.log('количество новостей:', news.length - 1);

    return -(
      (slideWidth + gap) * (news.length - 1) -
      (slideWidth + gap) -
      sliderOffset
    );
  }, [slideWidth, gap, news.length, sliderOffset]);

  const updateAdaptiveValues = useCallback(() => {
    const width = window.innerWidth;
    const basePosition = getBaseLastPosition();
    console.log(basePosition);

    if (width <= BREAKPOINTS.MOBILE) {
      setSliderOffset(DEFAULT_OFFSETS.MOBILE);
      setLastPosition(basePosition - (BREAKPOINTS.TABLET - width));
    } else if (width <= BREAKPOINTS.TABLET) {
      setLastPosition(basePosition - (BREAKPOINTS.DESKTOP - width));
    } else {
      setLastPosition(basePosition);
    }
  }, [getBaseLastPosition]);

  useEffect(() => {
    if (!ref.current || news.length === 0) return;

    const firstSlide = ref.current.firstElementChild as HTMLElement;
    if (!firstSlide) return;

    setSlideWidth(firstSlide.offsetWidth);
    const computedStyle = window.getComputedStyle(ref.current);
    setGap(parseInt(computedStyle.gap) || 0);
  }, [news, ref]);

  useEffect(() => {
    const handleResize = () => updateAdaptiveValues();

    updateAdaptiveValues();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateAdaptiveValues]);

  return { lastPosition, sliderOffset };
};
