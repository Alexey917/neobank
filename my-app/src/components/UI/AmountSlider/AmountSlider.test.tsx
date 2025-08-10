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
    const testProps = {
      ...mockProps,
      value: 50000,
      min: 0,
      max: 100000,
      formatMoney: (value: number) => value.toLocaleString(),
    };

    render(<AmountSlider {...testProps} />);

    expect(screen.getByText('Select amount')).toBeInTheDocument();

    expect(screen.getByText('50 000')).toBeInTheDocument();

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100000')).toBeInTheDocument();
  });

  it('displays formatted value correctly', () => {
    const customFormat = (num: number) => `${num}`;
    render(<AmountSlider {...mockProps} formatMoney={customFormat} />);
    expect(screen.getByText('50000')).toBeInTheDocument();
  });

  it('calls startDrag on thumb mouse/touch events', () => {
    render(<AmountSlider {...mockProps} />);

    const thumb = document.querySelector('.thumb');
    if (!thumb) throw new Error('Thumb element not found');

    mockProps.startDrag.mockClear();

    fireEvent.mouseDown(thumb);

    fireEvent.touchStart(thumb);

    expect(mockProps.startDrag).toHaveBeenCalledTimes(2);
  });

  it('applies correct styles based on value', () => {
    const { container } = render(<AmountSlider {...mockProps} value={30000} />);

    const progress = container.querySelector('.progress');
    expect(progress).toHaveStyle('width: 300%'); // 30000 / 100000 * 100
  });

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
