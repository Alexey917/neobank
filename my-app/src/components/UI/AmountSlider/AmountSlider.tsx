import { FC, RefObject } from 'react';
import classes from './AmountSlider.module.scss';

interface IAmountSlider {
  handleChange: (elem: React.ChangeEvent<HTMLInputElement>) => void;
  startDrag: () => void;
  formatMoney: (num: number) => string;
  MIN: number;
  MAX: number;
  value: number;
  sliderRef: RefObject<HTMLDivElement | null>;
  thumbRef: RefObject<HTMLDivElement | null>;
}

export const AmountSlider: FC<IAmountSlider> = ({
  value,
  sliderRef,
  thumbRef,
  MIN,
  MAX,
  formatMoney,
  startDrag,
  handleChange,
}) => {
  return (
    <div
      className={classes.customSlider}
      role="group"
      aria-labelledby="slider-title"
    >
      <h4 id="slider-title" className={classes.sliderTitle}>
        Select amount
      </h4>
      <div className={classes.valueDisplay}>{formatMoney(value)}</div>

      {/* Скрытый нативный input для доступности */}
      <input
        type="range"
        min={MIN}
        max={MAX}
        value={value}
        onChange={handleChange}
        className={classes.rangeInput}
        aria-hidden="true"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={value}
        aria-valuetext={formatMoney(value)}
      />

      {/* Кастомный слайдер */}
      <div className="custom-slider" ref={sliderRef} aria-hidden="true">
        <div className="track">
          <div className="progress" style={{ width: `${value * 0.01}%` }}></div>
        </div>
        <div
          data-testid="range"
          className="thumb"
          ref={thumbRef}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={value}
          aria-valuetext={formatMoney(value)}
          aria-labelledby="slider-title"
        ></div>
      </div>

      <div className={classes.sliderLabels}>
        <span className={classes.sliderMinValue}>{MIN}</span>
        <span className={classes.sliderMaxValue}>{MAX}</span>
      </div>
    </div>
  );
};
