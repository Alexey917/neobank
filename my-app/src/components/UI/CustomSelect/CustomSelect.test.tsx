import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomSelect } from './CustomSelect';

describe('CustomSelect component', () => {
  const mockOptions = [
    { key: 'option1', value: 'Option 1' },
    { key: 'option2', value: 'Option 2' },
    { key: 'option3', value: 'Option 3' },
  ];

  const mockRegister = {
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
    name: 'test-select',
  };

  it('renders correctly with default props', () => {
    render(
      <CustomSelect options={mockOptions} width={20} defaultValue="option1" />,
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('option1');
    expect(select).toHaveStyle('width: 20rem');
  });

  it('displays all options correctly', () => {
    render(
      <CustomSelect options={mockOptions} width={20} defaultValue="option1" />,
    );

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.value)).toBeInTheDocument();
    });
  });

  it('handles selection change', () => {
    render(
      <CustomSelect options={mockOptions} width={20} defaultValue="option1" />,
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });
    expect(select).toHaveValue('option2');
  });

  it('applies error class when required is true', () => {
    const { container } = render(
      <CustomSelect
        options={mockOptions}
        width={20}
        defaultValue=""
        required={true}
      />,
    );

    const select = container.querySelector('select');
    expect(select?.className).toMatch(/_error_/);
  });

  it('renders hidden empty option when no defaultValue', () => {
    render(<CustomSelect options={mockOptions} width={20} defaultValue="" />);

    const emptyOption = document.querySelector('option[value=""]');
    expect(emptyOption).toBeInTheDocument();
  });
});
