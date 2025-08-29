import { screen, render, waitFor } from '@testing-library/react';
import { useFetchCurrencies } from '../../hooks/useFetchCurrencies';
import { Currencies } from './Currencies';
import { Loader } from '../UI/Loader/Loader';

vi.mock('../../hooks/useFetchCurrencies', () => ({
  useFetchCurrencies: vi.fn(),
}));
vi.mock('../UI/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader">Loader</div>,
}));
vi.mock('../../assets/sprite.svg', () => ({
  __esModule: true,
  default: 'test-sprite-path',
  ReactComponent: () => <svg data-testid="svg-mock" />,
}));

const mockedLoader = vi.mocked(Loader);
const mockedUseFetchCurrencies = vi.mocked(useFetchCurrencies);

describe('Currencies component', () => {
  const mockCurrencies = [
    { currency: 'USD', rate: '1.00' },
    { currency: 'EUR', rate: '0.85' },
  ];

  it('should render loading state', () => {
    mockedUseFetchCurrencies.mockReturnValue({
      convertCurrencies: [],
      isLoading: true,
      error: '',
      date: '',
    });

    render(<Currencies />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should render error state', () => {
    const errorMessage = 'Failed to load data';
    mockedUseFetchCurrencies.mockReturnValue({
      convertCurrencies: [],
      isLoading: false,
      error: errorMessage,
      date: '',
    });

    render(<Currencies />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('should render currency list when data is loaded', async () => {
    mockedUseFetchCurrencies.mockReturnValue({
      convertCurrencies: mockCurrencies,
      isLoading: false,
      error: '',
      date: '01.01.2023',
    });

    render(<Currencies />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Exchange rate in internet bank' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Currency' }),
      ).toBeInTheDocument();

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);

      expect(screen.getByText('USD:')).toBeInTheDocument();
      expect(screen.getByText('1.00')).toBeInTheDocument();
      expect(screen.getByText('EUR:')).toBeInTheDocument();
      expect(screen.getByText('0.85')).toBeInTheDocument();

      expect(
        screen.getByText('Update every 15 minutes, MSC 01.01.2023'),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'View all currency rates' }),
      ).toHaveAttribute(
        'href',
        'https://alfaforex.ru/analytics/analytics-currencies/',
      );
    });
  });

  it('should render SVG icon', () => {
    mockedUseFetchCurrencies.mockReturnValue({
      convertCurrencies: mockCurrencies,
      isLoading: false,
      error: '',
      date: '01.01.2023',
    });

    render(<Currencies />);

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg?.querySelector('use')).toHaveAttribute(
      'href',
      'test-sprite-path#currency',
    );
  });
});
