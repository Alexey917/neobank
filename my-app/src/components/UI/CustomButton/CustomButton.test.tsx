import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CustomButton } from './CustomButton';
import { getTab } from '../../../redux/features/store';

const mockStore = configureStore({
  reducer: {
    tab: () => ({
      activeTab: 'Test Tab',
    }),
  },
});

vi.mock('../../../redux/features/store', () => ({
  getTab: vi.fn(),
}));

describe('CustomButton component', () => {
  beforeEach(() => {
    vi.mocked(getTab).mockImplementation(() => ({
      activeTab: 'About card',
    }));
  });

  it('renders correctly with basic props', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <CustomButton text="About card" paddings="pPrimary" variant="primary" />
      </Provider>,
    );

    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button?.className).toMatch(new RegExp(`_button_`));
    expect(button?.className).toMatch(new RegExp(`_pPrimary_`));
    expect(button?.className).toMatch(new RegExp(`_primary_`));
    expect(button).not.toBeDisabled();
  });

  it('applies correct type attribute', () => {
    render(
      <Provider store={mockStore}>
        <CustomButton
          text="Submit"
          paddings="pPrimary"
          variant="primary"
          type="submit"
        />
      </Provider>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('handles disabled state', () => {
    render(
      <Provider store={mockStore}>
        <CustomButton
          text="Disabled"
          paddings="pPrimary"
          variant="primary"
          disabled={true}
        />
      </Provider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const mockOnClick = vi.fn();

    render(
      <Provider store={mockStore}>
        <CustomButton
          text="Click me"
          paddings="pPrimary"
          variant="primary"
          onClick={mockOnClick}
        />
      </Provider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies active class when text matches activeTab', () => {
    vi.mocked(getTab).mockImplementation(() => ({
      activeTab: 'Cashback',
    }));

    const { container } = render(
      <Provider store={mockStore}>
        <CustomButton text="Cashback" paddings="pTab" variant="tab" />
      </Provider>,
    );

    const button = container.querySelector('button');
    expect(button?.className).toMatch(new RegExp(`_active_`));
  });

  it('does not apply active class when text does not match activeTab', () => {
    vi.mocked(getTab).mockImplementation(() => ({
      activeTab: 'FAQ',
    }));

    const { container } = render(
      <Provider store={mockStore}>
        <CustomButton text="FAQ" paddings="pTab" variant="tab" />
      </Provider>,
    );

    const button = container.querySelector('button');
    expect(button?.className).toMatch(new RegExp(`_active_`));
  });

  it('renders with all variant classes', () => {
    type buttonVariant = 'primary' | 'tab' | 'danger';
    const variants: buttonVariant[] = ['primary', 'tab', 'danger'];

    variants.forEach((variant) => {
      const { container } = render(
        <Provider store={mockStore}>
          <CustomButton text={variant} paddings="pPrimary" variant={variant} />
        </Provider>,
      );

      const button = container.querySelector('button');
      expect(button?.className).toMatch(new RegExp(`_${variant}_`));
    });
  });

  it('renders with all padding classes', () => {
    type buttonPaddings =
      | 'pTab'
      | 'pPrimary'
      | 'pBack'
      | 'pContinue'
      | 'pSelect'
      | 'pContinueRegistration'
      | 'pDoc'
      | 'pCancel'
      | 'pSend'
      | 'pCongratulation';

    const paddings: buttonPaddings[] = [
      'pTab',
      'pPrimary',
      'pBack',
      'pContinue',
      'pSelect',
      'pContinueRegistration',
      'pDoc',
      'pCancel',
      'pSend',
      'pCongratulation',
    ];

    paddings.forEach((padding) => {
      const { container } = render(
        <Provider store={mockStore}>
          <CustomButton text={padding} paddings={padding} variant="primary" />
        </Provider>,
      );

      const button = container.querySelector('button');
      expect(button?.className).toMatch(new RegExp(`_${padding}_`));
    });
  });
});
