import { useState, useEffect, useRef } from 'react';

export const useAmountSlider = (initialValue = 150000) => {
  const [value, setValue] = useState<number>(initialValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const MIN = 15000;
  const MAX = 600000;

  // Форматирование денежной суммы (пример для рублей)
  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
    }).format(val);
  };

  // Обработчик изменения через input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value.trim()));
  };

  // Обработчики для кастомного драга
  const startDrag = () => {
    isDragging.current = true;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('touchend', stopDrag);
  };

  //

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

  return {
    value,
    sliderRef,
    thumbRef,
    MIN,
    MAX,
    formatMoney,
    startDrag,
    handleChange,
  };
};
