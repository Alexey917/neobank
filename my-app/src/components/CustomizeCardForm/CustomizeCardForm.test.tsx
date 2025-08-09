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

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(),
    handleSubmit: vi.fn((fn) => (e: any) => {
      e?.preventDefault?.();
      return fn({});
    }),
     formState: {
      errors: {},
      isDirty: false,
      isLoading: false,
      isSubmitted: false,
      isSubmitSuccessful: false,
      isSubmitting: false,
      isValid: false,
      isValidating: false,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      defaultValues: undefined,
    } as FormState<ISendData>,
    watch: vi.fn(),
    setValue: vi.fn(),
    control: {
      register: vi.fn(),
      unregister: vi.fn(),
      getFieldState: vi.fn(),
      setValue: vi.fn(),
      getValues: vi.fn(),
      trigger: vi.fn(),
      reset: vi.fn(),
      handleSubmit: vi.fn(),
      watch: vi.fn(),
    } as unknown as Control,
  })),
}));


vi.mock('../../hooks/usePostRequest', () => ({
  usePostRequest: vi.fn(),
}));

vi.mock('../../API/api', () => ({
  sendCustomizeForm: vi.fn(),
}));

// vi.mock('../../redux/features/store', () => ({
//   store: {
//     dispatch: vi.fn(),
//   },
// }));

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

const mockedUseForm = vi.mocked(useForm);
const mockedUsePostRequest = vi.mocked(usePostRequest);

describe('CustomizeCardForm', () => {
  const mockUseForm = {
    register: vi.fn(),
    formState: { errors: {} },
    handleSubmit: vi.fn((fn) => fn),
    setValue: vi.fn(),
    watch: vi.fn(),
  };

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

  const mockFormRef = { current: null };

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

  it('submits form correctly', async () => {
    const mockData: ISendData = {
      amount: 150000,
      term: 6,
      firstName: 'John',
      lastName: 'Doe',
      middleName: '',
      email: 'john.doe@example.com',
      birthdate: '1990-01-01',
      passportSeries: '1234',
      passportNumber: '567890',
    };

    const mockWatch = vi.fn();
    mockWatch.mockImplementation((field?: keyof ISendData) => {
      if (!field) return mockData;
      return mockData[field];
    });

    // Мокаем useForm с правильной типизацией
    vi.mocked(useForm).mockReturnValue({
      register: vi.fn(),
      handleSubmit: (fn: SubmitHandler<ISendData>) => (e: any) => {
        e?.preventDefault?.();
        fn(mockData);
        return Promise.resolve();
      },
      formState: {
        errors: {},
        isDirty: true,
        isLoading: false,
        isSubmitted: true,
        isSubmitSuccessful: true,
        isSubmitting: false,
        isValid: true,
        isValidating: false,
        submitCount: 1,
        dirtyFields: { amount: true, email: true },
        touchedFields: { amount: true, email: true },
        defaultValues: undefined,
        disabled: false,
        validatingFields: {},
        isReady: true,
      },
      watch: mockWatch,
      setValue: vi.fn(),
      setValue: vi.fn(),
      getValues: vi.fn(() => mockData),
      getFieldState: vi.fn(),
      control: {
        // Минимально необходимые свойства для теста
        _subjects: {},
        _removeUnmounted: vi.fn(),
        _names: new Set(),
        _state: {},
        register: vi.fn(),
      } as unknown as Control,
    })

    // Мокаем usePostRequest
    const mockAxiosPost = vi.fn().mockResolvedValue({
      status: 200,
      data: [{ applicationId: '12345' }],
    });

    vi.mocked(usePostRequest).mockReturnValue({
      axiosPost: mockAxiosPost,
      loading: false,
      error: null,
    });

    render(
      <Provider store={mockStore}>
        <CustomizeCardForm formRef={mockFormRef} />
      </Provider>
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockAxiosPost).toHaveBeenCalledWith(
        sendCustomizeForm,
        expect.objectContaining({
          amount: 150000,
          term: '6 month',
          email: 'john.doe@example.com',
        })
      );
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
  });

  // it('handles form validation errors', () => {
  //   useForm.mockReturnValue({
  //     ...mockUseForm,
  //     formState: {
  //       errors: {
  //         firstName: { message: 'First name is required' },
  //         email: { message: 'Invalid email' },
  //       },
  //     },
  //   });

  //   render(<CustomizeCardForm formRef={{ current: null }} />);

  //   expect(screen.getByText('First name is required')).toBeInTheDocument();
  //   expect(screen.getByText('Invalid email')).toBeInTheDocument();
  // });

  // it('handles amount change correctly', () => {
  //   const setValue = vi.fn();

  //   mockedUseForm.mockReturnValue({
  //     ...mockUseForm,
  //     setValue,
  //     watch: vi.fn().mockReturnValue(0),
  //   });

  //   render(<CustomizeCardForm formRef={{ current: null }} />);

  //   const amountInput = screen.getByRole('spinbutton', { name: /amount/i });
  //   fireEvent.change(amountInput, { target: { value: '200000' } });

  //   expect(setValue).toHaveBeenCalledWith('amount', 200000, {
  //     shouldValidate: true,
  //   });
  // });
});
