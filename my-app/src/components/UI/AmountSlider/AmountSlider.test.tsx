import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { AmountSlider } from './AmountSlider';
import classes from './AmountSlider.module.scss';

describe('AmountSlider component', () => {
  const mockProps = {
    value: 50000,
    MIN: 0,
    MAX: 100000,
    formatMoney: (num: number) => `$${num.toLocaleString()}`,
    startDrag: vi.fn(),
    handleChange: vi.fn(),
    sliderRef: { current: null },
    thumbRef: { current: null },
  };

  it('renders correctly with initial props', () => {
    render(<AmountSlider {...mockProps} />);

    // Проверяем заголовок
    expect(screen.getByText('Select amount')).toBeInTheDocument();

    // Проверяем отображение значения
    expect(screen.getByText('50000')).toBeInTheDocument();

    // Проверяем минимальное и максимальное значения
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100000')).toBeInTheDocument();
  });

  it('displays formatted value correctly', () => {
    const customFormat = (num: number) => `EUR ${num}`;
    render(<AmountSlider {...mockProps} formatMoney={customFormat} />);
    expect(screen.getByText('EUR 50000')).toBeInTheDocument();
  });

  it('calls handleChange when input value changes', () => {
    const { container } = render(<AmountSlider {...mockProps} />);

    const input = container.querySelector('input[type="range"]');
    if (!input) throw new Error('Input element not found');
    fireEvent.change(input, { target: { value: '50000' } });

    expect(mockProps.handleChange).toHaveBeenCalledTimes(1);
    expect(mockProps.handleChange.mock.calls[0][0].target.value).toBe('50000');
  });

  it('calls startDrag on thumb mouse/touch events', () => {
    render(<AmountSlider {...mockProps} />);

    const thumb = document.querySelector('.thumb');
    if (!thumb) throw new Error('Thumb element not found');

    fireEvent.mouseDown(thumb);
    fireEvent.touchStart(thumb);

    expect(mockProps.startDrag).toHaveBeenCalledTimes(2);
  });

  it('applies correct styles based on value', () => {
    const { container } = render(<AmountSlider {...mockProps} value={30000} />);

    const progress = container.querySelector('.progress');
    expect(progress).toHaveStyle('width: 300%'); // 30000 / 100000 * 100
  });

  // it('renders with different value correctly', () => {
  //   render(<AmountSlider {...mockProps} value={75000} />);
  //   expect(screen.getByText('75 000')).toBeInTheDocument();
  // });

  it('passes refs correctly', () => {
    const sliderRef = { current: null };
    const thumbRef = { current: null };

    render(
      <AmountSlider {...mockProps} sliderRef={sliderRef} thumbRef={thumbRef} />,
    );

    const slider = document.querySelector('.custom-slider');
    const thumb = document.querySelector('.thumb');

    expect(sliderRef.current).toBe(slider);
    expect(thumbRef.current).toBe(thumb);
  });
});
