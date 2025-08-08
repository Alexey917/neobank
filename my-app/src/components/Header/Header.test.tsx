import { screen, render, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';
import classes from './Header.module.scss';

vi.mock('./openMobileMenu', () => ({
  openMobileMenu: vi.fn(),
}));

vi.mock('../../assets/sprite.svg', () => ({
  __esModule: true,
  default: 'test-sprite-path',
}));

vi.mock('../HeaderMenu/HeaderMenu', () => ({
  HeaderMenu: () => <div data-testid="header-menu">Mock Menu</div>,
}));

describe('Header component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Credit card' })).toHaveAttribute(
      'href',
      '/loan',
    );

    expect(screen.getByRole('link', { name: 'Online Bank' })).toHaveAttribute(
      'href',
      '/onlineBank',
    );
  });

  it('change icon on click', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('header-menu')).toBeNull();

    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    expect(screen.getByTestId('header-menu')).toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(screen.queryByTestId('header-menu')).toBeNull();
  });

  it('changes menu icon when clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const btn = screen.getByRole('button');
    const svg = btn.querySelector('svg');

    expect(svg).toHaveClass(classes.header__openMenu_icon);

    fireEvent.click(btn);
    expect(svg).toHaveClass(classes.header__closeMenu_icon);

    fireEvent.click(btn);
    expect(svg).toHaveClass(classes.header__openMenu_icon);
  });
});
