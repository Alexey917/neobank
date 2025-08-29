import { screen, render, fireEvent } from '@testing-library/react';
import { Message } from './Message';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { tabsReducer } from '../../redux/features/tabs/tabSlice';
import { stepsReducer } from '../../redux/features/steps/stepSlice';
import userEvent from '@testing-library/user-event';

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}));

vi.mock('react-redux', async () => ({
  ...(await vi.importActual('react-redux')),
  useDispatch: () => mockDispatch,
}));

const mockProps = {
  title: 'title',
  text: 'text',
  variant: 'primary' as const,
};

describe('Message component', () => {
  const mockStore = configureStore({
    reducer: {
      tabs: () => tabsReducer,
      steps: () => stepsReducer,
    },
  });

  it('render title and text', () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Message {...mockProps} />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.text)).toBeInTheDocument();
  });

  it('renders button when btn prop is true', async () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Message {...mockProps} btn={true} />
        </Provider>
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', {
      name: /View other offers of our bank/i,
    });
    await userEvent.click(button);

    fireEvent.click(screen.getByText('View other offers of our bank'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'steps/switchStep',
        payload: 'BEGIN',
      }),
    );
    expect(localStorage.getItem('offers')).toBeNull();
  });

  it('renders button when btn prop is false', () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Message {...mockProps} btn={false} />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('render img when we have prop img', () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Message {...mockProps} img="imgCongratulation" />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'imgCongratulation');
    expect(screen.getByAltText('box-congratulations')).toBeInTheDocument();
  });

  it('render img when we have not prop img', () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Message {...mockProps} />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
