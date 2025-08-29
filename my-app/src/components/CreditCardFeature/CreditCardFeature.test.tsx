import { screen, render, queryByRole } from '@testing-library/react';
import { CreditCardFeature } from './CreditCardFeature';
import { useTooltip } from '../../hooks/useTooltip';

vi.mock('../../hooks/useTooltip', () => ({
  useTooltip: vi.fn(() => true),
}));

const mockedUseTooltip = vi.mocked(useTooltip);

const mockItem = {
  title: '0 ₽',
  text: 'Card service is free',
  tooltipText: 'Promotion valid until December 31, 2022.',
};

describe('CreditCardFeature component', () => {
  it('render props', () => {
    render(
      <CreditCardFeature
        title={mockItem.title}
        text={mockItem.text}
        tooltipText={mockItem.tooltipText}
      />,
    );

    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getByText(mockItem.text)).toBeInTheDocument();
    expect(screen.getByText(mockItem.tooltipText)).toBeInTheDocument();
  });

  it('should not render tooltip on mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 800, // Меньше 992px
    });

    render(
      <CreditCardFeature
        title={mockItem.title}
        text={mockItem.text}
        tooltipText={mockItem.tooltipText}
      />,
    );

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument;
  });

  it('should render tooltip on desktop when hovered', () => {
    mockedUseTooltip.mockReturnValue(true);

    render(
      <CreditCardFeature
        title={mockItem.title}
        text={mockItem.text}
        tooltipText={mockItem.tooltipText}
      />,
    );

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('availability check', () => {
    render(
      <CreditCardFeature
        title={mockItem.title}
        text={mockItem.text}
        tooltipText={mockItem.tooltipText}
      />,
    );

    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute(
      'aria-describedby',
      `tooltip-${mockItem.title}`,
    );
  });
});
