import next from '../../../assets/sprite.svg';
import prev from '../../../assets/sprite.svg';

import classes from './NewsSliderButton.module.scss';

export const NewsSliderButton = () => {
  return (
    <div className={classes.sliderButtons}>
      <button
        type="button"
        className={`${classes.sliderButton} ${classes.sliderButton_prev}`}
      >
        <svg className={classes.sliderButton_prevIcon}>
          <use href={prev + '#prev'}></use>
        </svg>
      </button>
      <button
        type="button"
        className={`${classes.sliderButton} ${classes.sliderButton_next}`}
      >
        <svg className={classes.sliderButton_nextIcon}>
          <use href={next + '#next'}></use>
        </svg>
      </button>
    </div>
  );
};
