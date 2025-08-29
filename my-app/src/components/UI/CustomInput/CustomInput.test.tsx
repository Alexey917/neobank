import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomInput } from './CustomInput';

vi.mock('../../../assets/sprite.svg', () => ({
  default: 'test-sprite.svg',
}));

describe('CustomInput component', () => {
  const mockRegister = {
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
    name: 'test-input',
  };

  it('renders correctly with basic props', () => {
    const { container } = render(
      <CustomInput
        width={20}
        type="text"
        variant="primary"
        placeholder="Enter text"
      />,
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveStyle('width: 20rem');

    const inputElement = container.querySelector('input');
    expect(inputElement?.className).toMatch(/_primary_/);
    expect(inputElement?.className).toMatch(/_input_/);
  });

  it('handles value and onChange', () => {
    const handleChange = vi.fn();
    render(
      <CustomInput
        width={20}
        type="text"
        variant="primary"
        value={123}
        onChange={handleChange}
      />,
    );

    const input = screen.getByDisplayValue(123);
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows error icon when svgError is true', () => {
    const { container } = render(
      <CustomInput width={20} type="text" variant="primary" svgError={true} />,
    );

    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBe(2); // error и ok иконки

    const errorIcon = Array.from(svgElements).find((svg) =>
      svg.innerHTML.includes('#error'),
    );
    expect(errorIcon).toBeInTheDocument();
  });

  it('applies correct error classes based on width', () => {
    const { container, rerender } = render(
      <CustomInput width={38} type="text" variant="primary" svgError={true} />,
    );

    // Проверяем класс для большого размера
    let errorIcon = container.querySelector('svg');
    expect(errorIcon?.getAttribute('class')).toMatch(
      new RegExp(`_error__iconL_`),
    );

    rerender(
      <CustomInput
        width={25.0625}
        type="text"
        variant="primary"
        svgError={true}
      />,
    );

    errorIcon = container.querySelector('svg');
    expect(errorIcon?.getAttribute('class')).toMatch(
      new RegExp(`_error__iconM_`),
    );

    rerender(
      <CustomInput width={10} type="text" variant="primary" svgError={true} />,
    );
    errorIcon = container.querySelector('svg');

    expect(errorIcon?.getAttribute('class')).toMatch(
      new RegExp(`_error__icon_`),
    );
  });

  it('integrates with react-hook-form register', () => {
    render(
      <CustomInput
        width={20}
        type="text"
        variant="primary"
        register={mockRegister}
      />,
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.blur(input);

    expect(mockRegister.onChange).toHaveBeenCalled();
    expect(mockRegister.onBlur).toHaveBeenCalled();
  });

  it('applies correct variant class', () => {
    const variants = ['primary', 'amount', 'checkbox'] as const;

    variants.forEach((variant) => {
      const { container } = render(
        <CustomInput width={20} type="text" variant={variant} />,
      );

      const input = container.querySelector('input');
      expect(input?.className).toMatch(new RegExp(`_${variant}_`));
    });
  });
});
