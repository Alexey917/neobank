import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Accordion } from './Accordion';
import classes from './Accordion.module.scss';

describe('Accordion component', () => {
  const mockProps = {
    question: 'Test question?',
    answer: 'Test answer',
    isOpen: false,
    onClick: vi.fn(),
  };

  it('renders question correctly', () => {
    render(<Accordion {...mockProps} />);
    expect(screen.getByText(mockProps.question)).toBeInTheDocument();
  });

  it('does not show answer when isOpen is false', () => {
    render(<Accordion {...mockProps} />);
    expect(screen.queryByText(mockProps.answer)).not.toBeInTheDocument();
  });

  it('shows answer when isOpen is true', () => {
    render(<Accordion {...mockProps} isOpen={true} />);
    expect(screen.getByText(mockProps.answer)).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    render(<Accordion {...mockProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('rotates icon when open', () => {
    const { container } = render(<Accordion {...mockProps} isOpen={true} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle('transform: rotate(180deg)');
  });

  it('does not rotate icon when closed', () => {
    const { container } = render(<Accordion {...mockProps} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle('transform: rotate(0deg)');
  });
});
