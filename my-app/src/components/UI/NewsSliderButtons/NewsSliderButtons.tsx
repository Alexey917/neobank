import { FC } from 'react';
import next from '../../../assets/sprite.svg';
import prev from '../../../assets/sprite.svg';

import classes from './NewsSliderButton.module.scss';

interface ISliderButtonsProps {
  scrollSliderRight: () => void;
  scrollSliderLeft: () => void;
  isPrev: boolean;
  isNext: boolean;
}

export const NewsSliderButton: FC<ISliderButtonsProps> = ({
  scrollSliderRight,
  scrollSliderLeft,
  isPrev,
  isNext,
}) => {
  return (
    <div className={classes.sliderButtons}>
      <button
        type="button"
        className={`${classes.sliderButton} ${classes.sliderButton_prev}`}
        onClick={scrollSliderLeft}
        disabled={isPrev}
      >
        <svg className={classes.sliderButton_prevIcon}>
          <use href={prev + '#prev'}></use>
        </svg>
      </button>
      <button
        type="button"
        className={`${classes.sliderButton} ${classes.sliderButton_next}`}
        onClick={scrollSliderRight}
        disabled={isNext}
      >
        <svg className={classes.sliderButton_nextIcon}>
          <use href={next + '#next'}></use>
        </svg>
      </button>
    </div>
  );
};
