import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { CashbackTab } from './CashbackTab';
import { CASHBACK_TAB } from '../../consts/consts';

describe('CashbackTab component', () => {
  it('CashbackTab render', () => {
    render(<CashbackTab />);
    CASHBACK_TAB.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      if (item.text === '5%') {
        expect(screen.getAllByText(item.text));
      } else {
        expect(screen.getByText(item.text)).toBeInTheDocument();
      }
    });
  });

  it('renders without errors', () => {
    render(<CashbackTab />);
    expect(
      screen.getByRole('region', { name: 'Cashback Terms' }),
    ).toBeInTheDocument();
  });

  it('CashbackTab snapshot', () => {
    const CashbackSnapshot = render(<CashbackTab />);
    expect(CashbackSnapshot).toMatchSnapshot();
  });
});
