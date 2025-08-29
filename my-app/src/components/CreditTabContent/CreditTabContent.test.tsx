import { screen, render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { CreditTabContent } from './CreditTabContent';

vi.mock('../AboutTab/AboutTab', () => ({
  AboutTab: () => <div data-testid="about-tab">AboutTab Mock</div>,
}));

vi.mock('../RatesTab/RatesTab', () => ({
  RatesTab: () => <div data-testid="rates-tab">RatesTab Mock</div>,
}));

vi.mock('../CashbackTab/CashbackTab', () => ({
  CashbackTab: () => <div data-testid="cashback-tab">CashbackTab Mock</div>,
}));

vi.mock('../FaqTab/FaqTab', () => ({
  FaqTab: () => <div data-testid="faq-tab">FaqTab Mock</div>,
}));

describe('CreditTabContent component', () => {
  const createMockStore = (activeTab: string) =>
    configureStore({
      reducer: {
        tabs: () => ({ activeTab }),
        steps: () => ({}),
      },
    });

  it('should render AboutTab when activeTab is "About card"', () => {
    render(
      <Provider store={createMockStore('About card')}>
        <CreditTabContent />
      </Provider>,
    );

    expect(screen.getByTestId('about-tab')).toBeInTheDocument();
    expect(screen.queryByTestId('rates-tab')).not.toBeInTheDocument();
  });

  it('should render RatesTab when activeTab is "Rates and conditions"', () => {
    render(
      <Provider store={createMockStore('Rates and conditions')}>
        <CreditTabContent />
      </Provider>,
    );

    expect(screen.getByTestId('rates-tab')).toBeInTheDocument();
    expect(screen.queryByTestId('about-tab')).not.toBeInTheDocument();
  });

  it('should render CashbackTab when activeTab is "Cashback"', () => {
    render(
      <Provider store={createMockStore('Cashback')}>
        <CreditTabContent />
      </Provider>,
    );

    expect(screen.getByTestId('cashback-tab')).toBeInTheDocument();
    expect(screen.queryByTestId('faq-tab')).not.toBeInTheDocument();
  });

  it('should render FaqTab when activeTab is "FAQ"', () => {
    render(
      <Provider store={createMockStore('FAQ')}>
        <CreditTabContent />
      </Provider>,
    );

    expect(screen.getByTestId('faq-tab')).toBeInTheDocument();
    expect(screen.queryByTestId('cashback-tab')).not.toBeInTheDocument();
  });
});
