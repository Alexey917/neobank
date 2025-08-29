import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox component', () => {
  it('renders correctly with given props', () => {
    const mockOnChange = vi.fn();

    render(
      <Checkbox id="test-checkbox" checked={false} onChange={mockOnChange} />,
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox).toBeInTheDocument();
    expect(checkbox.id).toBe('test-checkbox');
    expect(checkbox.checked).toBe(false);
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('calls onChange handler when clicked', () => {
    const mockOnChange = vi.fn();

    render(
      <Checkbox id="test-checkbox" checked={false} onChange={mockOnChange} />,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('reflects the checked state correctly', () => {
    const mockOnChange = vi.fn();

    const { rerender } = render(
      <Checkbox id="test-checkbox" checked={true} onChange={mockOnChange} />,
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    rerender(
      <Checkbox id="test-checkbox" checked={false} onChange={mockOnChange} />,
    );

    expect(checkbox.checked).toBe(false);
  });

  it('passes correct event to onChange handler', () => {
    const mockOnChange = vi.fn();

    render(
      <Checkbox id="test-checkbox" checked={false} onChange={mockOnChange} />,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          id: 'test-checkbox',
          type: 'checkbox',
        }),
      }),
    );
  });
});
