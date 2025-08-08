import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const mockLinks = {
  'About bank': '/about',
  'Ask a Question': '/questions',
  'Quality of service': '/quality',
  'Requisites': '/requisites',
  'Press center': '/press',
};

vi.mock('../../assets/images/neoLogo.png', () => ({
  __esModule: true,
  default: 'test-logo-path',
  ReactComponent: () => <img data-testid="test-logo-path" />,
}));

describe('Footer Component', () => {
  it('renders logo and contact information', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const logoLink = screen.getByRole('link', { name: 'Neoflex homepage' });
    expect(logoLink).toHaveAttribute('href', 'https://www.neoflex.ru/');
    expect(logoLink.querySelector('img')).toHaveAttribute('alt', 'Neoflex');

    expect(screen.getByText('+7 (495) 984 25 13')).toHaveAttribute(
      'href',
      'tel:+74959842513',
    );
    expect(screen.getByText('info@neoflex.ru')).toHaveAttribute(
      'href',
      'mailto:info@neoflex.ru',
    );
  });

  it('renders all navigation links correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'About bank' })).toHaveAttribute(
      'href',
      '/about',
    );
    expect(screen.getByRole('link', { name: 'Press center' })).toHaveAttribute(
      'href',
      '/press',
    );
  });

  it('has proper accessibility attributes', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    const separator = document.querySelector('hr');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('aria-hidden', 'true');
  });
});
