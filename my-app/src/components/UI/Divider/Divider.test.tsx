import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider component', () => {
  const baseProps = {
    width: 10,
    thickness: 1,
    orientation: 'horizontal' as const,
    variant: 'solid' as const,
    color: 'grey' as const,
    type: 'tabs' as const,
  };

  it('renders horizontal divider with correct styles', () => {
    const { container } = render(<Divider {...baseProps} />);

    const divider = container.firstChild as HTMLElement;
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveStyle({
      height: '0px',
      borderBottom: '1rem solid rgba(128, 128, 128, 0.2)',
    });
    expect(divider.className).toMatch(/tabs/);
  });

  it('renders vertical divider with correct styles', () => {
    const { container } = render(
      <Divider
        {...baseProps}
        orientation="vertical"
        variant="dashed"
        color="blue-grey"
        type="form"
      />,
    );

    const divider = container.firstChild as HTMLElement;
    expect(divider).toHaveStyle({
      height: '10rem',
      borderBottom: '1rem dashed rgba(127, 146, 172, 1)',
    });
    expect(divider.className).toMatch(/borderVertical/);
    expect(divider.className).toMatch(/form/);
  });

  it('applies correct color for grey-dashed variant', () => {
    const { container } = render(
      <Divider {...baseProps} variant="dashed" color="grey-dashed" />,
    );

    const divider = container.firstChild as HTMLElement;
    expect(divider).toHaveStyle({
      borderBottom: '1rem dashed rgba(128, 128, 128, 0.4)',
    });
  });

  it('applies correct thickness', () => {
    const { container } = render(<Divider {...baseProps} thickness={2} />);
    const divider = container.firstChild as HTMLElement;
    expect(divider).toHaveStyle({
      borderBottom: '2rem solid rgba(128, 128, 128, 0.2)',
    });
  });
});
