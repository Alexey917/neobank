import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CreditCard } from './CreditCard';

describe('CreditCard component', () => {
  const mockStore = configureStore({
    reducer: {
      tabs: () => ({ activeTab: 'About card' }),
      steps: () => ({ activeStep: 'BEGIN' }),
    },
  });

  const mockScrollToForm = vi.fn();

  it('render title and text', () => {
    render(
      <Provider store={mockStore}>
        <CreditCard scrollToForm={mockScrollToForm} />
      </Provider>,
    );

    expect(
      screen.getByText('Platinum digital credit card'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Our best credit card. Suitable for everyday spending/),
    ).toBeInTheDocument();
  });

  it('displays all elements of the benefit', () => {
    render(
      <Provider store={mockStore}>
        <CreditCard scrollToForm={mockScrollToForm} />
      </Provider>,
    );

    expect(screen.getByText('Up to 160 days')).toBeInTheDocument();
    expect(screen.getByText('No percent')).toBeInTheDocument();
    expect(screen.getByText('Up to 600 000 ₽')).toBeInTheDocument();
    expect(screen.getByText('Credit limit')).toBeInTheDocument();
    expect(screen.getByText('0 ₽')).toBeInTheDocument();
    expect(screen.getByText('Card service is free')).toBeInTheDocument();
  });

  it('displays "Apply for card" for BEGIN', () => {
    const store = configureStore({
      reducer: {
        tabs: () => ({}),
        steps: () => ({ activeStep: 'BEGIN' }),
      },
    });

    render(
      <Provider store={store}>
        <CreditCard scrollToForm={mockScrollToForm} />
      </Provider>,
    );

    expect(screen.getByText('Apply for card')).toBeInTheDocument();
  });

  it('displays "Choose an offer" for PREAPPROVAL', () => {
    const store = configureStore({
      reducer: {
        tabs: () => ({}),
        steps: () => ({ activeStep: 'PREAPPROVAL' }),
      },
    });

    const mockScrollToForm = vi.fn();

    render(
      <Provider store={store}>
        <CreditCard scrollToForm={mockScrollToForm} />
      </Provider>,
    );

    expect(screen.getByText('Choose an offer')).toBeInTheDocument();
  });

  it('applies the rotate_img class when activeTab is not "About card"', () => {
    const store = configureStore({
      reducer: {
        tabs: () => ({ activeTab: 'Other tab' }),
        steps: () => ({}),
      },
    });

    const { container } = render(
      <Provider store={store}>
        <CreditCard scrollToForm={mockScrollToForm} />
      </Provider>,
    );

    const img = container.querySelector('img');
    expect(img?.className).toContain('rotate_img');
  });

  it('calls scrollToForm when the button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <CreditCard scrollToForm={mockScrollToForm} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Apply for card'));
    expect(mockScrollToForm).toHaveBeenCalled();
  });
});
