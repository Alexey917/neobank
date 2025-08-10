import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import { ModalWindow } from './ModalWindow';
import {
  stepsReducer,
  switchStep,
} from '../../../redux/features/steps/stepSlice';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: vi.fn(),
}));

vi.mock('../../../redux/features/steps/stepSlice', () => ({
  __esModule: true,
  ...vi.importActual('../../../redux/features/steps/stepSlice'),
  switchStep: vi.fn().mockReturnValue({
    type: 'steps/switchStep',
    payload: 'BEGIN',
  }),
}));

vi.mock('../CustomButton/CustomButton', () => ({
  CustomButton: vi.fn(({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
  )),
}));

vi.mock('../../../assets/sprite.svg', () => ({ default: 'test-sprite.svg' }));

describe('ModalWindow component', () => {
  const mockNavigate = vi.fn();
  const mockSetIsModal = vi.fn();
  const mockSetIsDeny = vi.fn();
  const mockSwitchStep = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  const renderModal = (props = {}) => {
    const defaultProps = {
      text: 'Test modal text',
      setIsModal: mockSetIsModal,
    };

    const store = configureStore({
      reducer: {
        steps: () => ({}),
      },
    });

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalWindow {...defaultProps} {...props} />
        </MemoryRouter>
      </Provider>,
    );
  };

  it('renders modal with basic props', () => {
    renderModal();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Deny application')).toBeInTheDocument();
    expect(screen.getByText('Test modal text')).toBeInTheDocument();
    expect(screen.getByLabelText('Close modal window')).toBeInTheDocument();
    expect(screen.getByText('Deny')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls setIsModal(false) when Cancel button is clicked', () => {
    renderModal();

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockSetIsModal).toHaveBeenCalledWith(false);
  });

  it('shows only Go home button when isDeny is true', () => {
    renderModal({ isDeny: true });

    expect(screen.getByText('Go home')).toBeInTheDocument();
    expect(screen.queryByText('Deny')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('navigates to home when Go home button is clicked', () => {
    renderModal({ isDeny: true });

    fireEvent.click(screen.getByText('Go home'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('closes modal or navigates based on isDeny when close button is clicked', () => {
    const { rerender } = renderModal();
    fireEvent.click(screen.getByLabelText('Close modal window'));
    expect(mockSetIsModal).toHaveBeenCalledWith(false);

    rerender(
      <Provider store={configureStore({ reducer: { steps: () => ({}) } })}>
        <MemoryRouter>
          <ModalWindow text="Test" setIsModal={mockSetIsModal} isDeny={true} />
        </MemoryRouter>
      </Provider>,
    );
    fireEvent.click(screen.getByLabelText('Close modal window'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
