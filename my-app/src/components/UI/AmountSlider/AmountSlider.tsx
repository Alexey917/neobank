import { useState, useEffect, useRef } from 'react';
import classes from './AmountSlider.module.scss';

export const AmountSlider = () => {
  const [value, setValue] = useState(150000);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const MIN = 15000;
  const MAX = 600000;

  // // Форматирование денежной суммы (пример для рублей)
  // const formatMoney = (val: number) => {
  //   return new Intl.NumberFormat('ru-RU', {
  //     style: 'currency',
  //     currency: 'RUB',
  //     minimumFractionDigits: 0,
  //   }).format(val * 1000); // Умножаем для примера
  // };

  // Обработчик изменения через input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  // Обработчики для кастомного драга
  const startDrag = () => {
    isDragging.current = true;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('touchend', stopDrag);
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current || !sliderRef.current) return;

    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const sliderRect = sliderRef.current.getBoundingClientRect();
    let newValue = ((clientX - sliderRect.left) / sliderRect.width) * 100;
    newValue = Math.max(MIN, Math.min(MAX, Math.round(newValue)));

    setValue(newValue);
  };

  const stopDrag = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('touchend', stopDrag);
  };

  // Позиция thumb
  useEffect(() => {
    if (thumbRef.current) {
      thumbRef.current.style.left = `calc(${value}% - 12px)`;
    }
  }, [value]);

  return (
    <div className="custom-slider-container">
      <div className="value-display"></div>

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
          <div className="progress" style={{ width: `${value}%` }}></div>
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
