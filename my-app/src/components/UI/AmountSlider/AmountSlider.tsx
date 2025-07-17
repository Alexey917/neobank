import { FC, RefObject } from 'react';
import { useAmountSlider } from '../../../hooks/useAmountSlider';
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
    <div className={classes.customSlider}>
      <h4 className={classes.sliderTitle}>Select amount</h4>
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
      />

      {/* Кастомный слайдер */}
      <div className="custom-slider" ref={sliderRef}>
        <div className="track">
          <div className="progress" style={{ width: `${value * 0.01}%` }}></div>
        </div>
        <div
          className="thumb"
          ref={thumbRef}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        ></div>
      </div>

      <div className={classes.sliderLabels}>
        <span>{MIN}</span>
        <span>{MAX}</span>
      </div>
    </div>
  );
};
