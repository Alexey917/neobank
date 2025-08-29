import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CustomLabel } from './CustomLabel';

describe('CustomLabel component', () => {
  it('renders label with text and correct attributes', () => {
    render(
      <CustomLabel text="Test Label" required={true} inputId="test-input" />,
    );

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test-input');
    expect(label).toHaveAttribute('aria-required', 'true');
  });

  it('shows required asterisk when required is true', () => {
    render(
      <CustomLabel text="Test Label" required={true} inputId="test-input" />,
    );

    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();

    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not show required asterisk when required is false', () => {
    render(
      <CustomLabel text="Test Label" required={false} inputId="test-input" />,
    );

    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('applies checkbox class when variant is provided', () => {
    const { container } = render(
      <CustomLabel
        text="Test Label"
        required={false}
        inputId="test-input"
        variant="checkbox"
      />,
    );

    const label = container.querySelector('label');
    expect(label?.className).toMatch(/label_checkbox/);
  });

  it('does not apply checkbox class when variant is not provided', () => {
    const { container } = render(
      <CustomLabel text="Test Label" required={false} inputId="test-input" />,
    );

    const label = container.querySelector('label');
    expect(label?.className).not.toMatch(/label_checkbox/);
  });
});
