import { render, screen } from '@testing-library/react';
import { NavItem } from './NavItem';
import { MemoryRouter } from 'react-router-dom';
import classes from './NavItem.module.scss';

describe('NavItem component', () => {
  const testProps = {
    children: 'Test Link',
    to: '/test',
  };

  // Общая функция рендеринга
  const renderNavItem = (active = false) => {
    return render(
      <MemoryRouter initialEntries={active ? [testProps.to] : ['/other-route']}>
        <NavItem {...testProps} />
      </MemoryRouter>,
    );
  };

  it('renders correctly with inactive state', () => {
    renderNavItem(false);

    const link = screen.getByRole('link', { name: testProps.children });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', testProps.to);
    expect(link).toHaveClass(classes.header__link);
    expect(link).not.toHaveClass(classes.header__link_active);
  });

  it('applies active class when route is active', () => {
    renderNavItem(true);

    const link = screen.getByRole('link', { name: testProps.children });
    expect(link).toHaveClass(classes.header__link_active);
    expect(link).toHaveClass(classes.header__link);
  });

  it('renders inside an li element', () => {
    renderNavItem(false);

    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeInTheDocument();
    expect(listItem).toContainElement(screen.getByRole('link'));
  });
});
