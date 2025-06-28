import { useState, RefObject } from 'react';

export const useSlider = (
  sliderOffset: number,
  lastPosition: number,
  ref: RefObject<HTMLUListElement | null>,
) => {
  const START_POSITION = 0;

  const [position, setPosition] = useState<number>(START_POSITION);
  const [isPrev, setIsPrev] = useState<boolean>(true);
  const [isNext, setIsNext] = useState<boolean>(false);

  const scrollSliderRight = () => {
    setPosition((prevPosition) => {
      const newPosition = prevPosition - sliderOffset;
      ref.current?.style.setProperty(
        'transform',
        `translateX(${newPosition}px)`,
      );
      newPosition >= START_POSITION ? setIsPrev(true) : setIsPrev(false);
      newPosition <= lastPosition ? setIsNext(true) : setIsNext(false);
      return newPosition;
    });
  };

  const scrollSliderLeft = () => {
    setPosition((prevPosition) => {
      const newPosition = prevPosition + sliderOffset;
      ref.current?.style.setProperty(
        'transform',
        `translateX(${newPosition}px)`,
      );
      newPosition >= START_POSITION ? setIsPrev(true) : setIsPrev(false);
      newPosition <= lastPosition ? setIsNext(true) : setIsNext(false);
      return newPosition;
    });
  };

  return { scrollSliderRight, scrollSliderLeft, isNext, isPrev };
};
