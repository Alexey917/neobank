import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { AboutTab } from './AboutTab';
import { ABOUT_TAB } from '../../consts/consts';

describe('AboutTab component', () => {
  it('AboutTab render', () => {
    render(<AboutTab />);
    ABOUT_TAB.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.text)).toBeInTheDocument();
    });
  });

  it('renders without errors', () => {
    render(<AboutTab />);
    expect(
      screen.getByRole('region', { name: 'About card' }),
    ).toBeInTheDocument();
  });

  it('renders SVG icons', () => {
    const { container } = render(<AboutTab />);
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBe(ABOUT_TAB.length);
  });
});
