import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useForm, SubmitHandler, FormState, Control } from 'react-hook-form';
import { CustomizeCardForm } from './CustomizeCardForm';
import { usePostRequest } from '../../hooks/usePostRequest';
import { sendCustomizeForm } from '../../API/api';
import { store } from '../../redux/features/store';
import { checkStatus } from '../../redux/features/steps/statusThunks';
import { DATA_FORM } from '../../consts/consts';
import { Provider } from 'react-redux';
import { tabsReducer } from '../../redux/features/tabs/tabSlice';
import { stepsReducer } from '../../redux/features/steps/stepSlice';
import { configureStore } from '@reduxjs/toolkit';
import { ISendData } from '../../types/types';
import userEvent from '@testing-library/user-event';

vi.mock('../../hooks/usePostRequest', () => ({
  usePostRequest: vi.fn(),
}));

vi.mock('../../API/api', () => ({
  sendCustomizeForm: vi.fn(),
}));

vi.mock('../../hooks/useAmountSlider', () => ({
  useAmountSlider: vi.fn(() => ({
    sliderRef: { current: null },
    thumbRef: { current: null },
    MIN: 0,
    MAX: 1000000,
    formatMoney: vi.fn(),
    startDrag: vi.fn(),
    handleChange: vi.fn(),
  })),
}));

vi.mock('../../utils/converterToRegisterOptions', () => ({
  convertToRegisterOptions: vi.fn(),
}));

vi.mock('../UI/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

const mockedUsePostRequest = vi.mocked(usePostRequest);

describe('CustomizeCardForm', () => {
  const mockAxiosPost = vi.fn();
  const mockDispatch = vi.fn();
  const mockSetIsSubmitted = vi.fn();

  beforeEach(() => {
    // Мокируем только необходимые зависимости
    vi.mock('../../../hooks/usePostRequest', () => ({
      usePostRequest: () => ({
        axiosPost: mockAxiosPost,
        loading: false,
        error: null,
      }),
    }));

    Storage.prototype.setItem = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockUsePostRequest = {
    axiosPost: vi.fn(),
    loading: false,
    error: null,
  };

  const mockStore = configureStore({
    reducer: {
      tabs: () => tabsReducer,
      steps: () => stepsReducer,
    },
  });

  it('renders loading state correctly', () => {
    mockedUsePostRequest.mockReturnValue({
      ...mockUsePostRequest,
      loading: true,
    });

    render(
      <Provider store={mockStore}>
        <CustomizeCardForm formRef={{ current: null }} />
      </Provider>,
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    mockedUsePostRequest.mockReturnValue({
      ...mockUsePostRequest,
      error: 'Test error',
    });

    render(
      <Provider store={mockStore}>
        <CustomizeCardForm formRef={{ current: null }} />
      </Provider>,
    );
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('renders form fields correctly', () => {
    render(
      <Provider store={mockStore}>
        <CustomizeCardForm formRef={{ current: null }} />
      </Provider>,
    );

    expect(screen.getByText('Customize your card')).toBeInTheDocument();
    expect(screen.getByText('Step 1 of 5')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();

    DATA_FORM.forEach((field) => {
      if (field.label) {
        expect(screen.getByText(field.label)).toBeInTheDocument();
      }
    });
  });
});
