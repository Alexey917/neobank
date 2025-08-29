import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { CustomLink } from './CustomLink';

// Мокаем useLocation для тестирования активного состояния
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
    search: '',
    hash: '',
    state: null,
    key: 'default',
  };
});

describe('CustomLink component', () => {
  const mockUseLocation = vi.mocked(useLocation);

  beforeEach(() => {
    mockUseLocation.mockReturnValue({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    });
  });

  it('renders correctly with basic props', () => {
    render(
      <MemoryRouter>
        <CustomLink to="/test" paddings="pNav" variant="primary">
          Test Link
        </CustomLink>
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies correct variant and padding classes', () => {
    const { container } = render(
      <MemoryRouter>
        <CustomLink to="/test" paddings="pPrimary" variant="header">
          Test Link
        </CustomLink>
      </MemoryRouter>,
    );

    const link = container.querySelector('a');
    expect(link?.className).toMatch(/header/);
    expect(link?.className).toMatch(/pPrimary/);
  });

  it('applies display type class when provided', () => {
    const { container } = render(
      <MemoryRouter>
        <CustomLink to="/test" paddings="pNav" variant="primary" type="mobile">
          Test Link
        </CustomLink>
      </MemoryRouter>,
    );

    const link = container.querySelector('a');
    expect(link?.className).toMatch(/mobile/);
  });

  it('does not apply isActive class for primary variant', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/test']}>
        <CustomLink to="/test" paddings="pNav" variant="primary">
          Test Link
        </CustomLink>
      </MemoryRouter>,
    );

    const link = container.querySelector('a');
    expect(link?.className).not.toMatch(/isActive/);
  });

  it('does not apply isActive class when path does not match', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    });

    const { container } = render(
      <MemoryRouter>
        <CustomLink to="/test" paddings="pNav" variant="header">
          Test Link
        </CustomLink>
      </MemoryRouter>,
    );

    const link = container.querySelector('a');
    expect(link?.className).not.toMatch(/isActive/);
  });

  it('renders children correctly', () => {
    render(
      <MemoryRouter>
        <CustomLink to="/test" paddings="pNav" variant="primary">
          <span>Custom Child</span>
        </CustomLink>
      </MemoryRouter>,
    );

    expect(screen.getByText('Custom Child')).toBeInTheDocument();
  });
});
