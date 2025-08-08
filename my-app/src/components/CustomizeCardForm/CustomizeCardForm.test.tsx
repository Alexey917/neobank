import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useForm } from 'react-hook-form';
import { CustomizeCardForm } from './CustomizeCardForm';
import { usePostRequest } from '../../hooks/usePostRequest';
import { sendCustomizeForm } from '../../API/api';
import { store } from '../../redux/features/store';
import { checkStatus } from '../../redux/features/steps/statusThunks';
import { DATA_FORM } from '../../consts/consts';

// Мокируем все зависимости
vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
}));

vi.mock('../../hooks/usePostRequest', () => ({
  usePostRequest: vi.fn(),
}));

vi.mock('../../API/api', () => ({
  sendCustomizeForm: vi.fn(),
}));

vi.mock('../../redux/features/store', () => ({
  store: {
    dispatch: vi.fn(),
  },
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

  beforeEach(() => {
    mockedUseForm.mockReturnValue(mockUseForm);
    mockedUsePostRequest.mockReturnValue(mockUsePostRequest);
    (mockUseForm.watch as vi.Mock).mockReturnValue(150000);
    vi.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    mockedUsePostRequest.mockReturnValue({
      ...mockUsePostRequest,
      loading: true,
    });

    render(<CustomizeCardForm formRef={{ current: null }} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    mockedUsePostRequest.mockReturnValue({
      ...mockUsePostRequest,
      error: 'Test error',
    });

    render(<CustomizeCardForm formRef={{ current: null }} />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('renders form fields correctly', () => {
    render(<CustomizeCardForm formRef={{ current: null }} />);

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
    const mockData = {
      amount: 150000,
      term: '6 month',
      firstName: 'John',
      lastName: 'Doe',
      middleName: '',
      email: 'john.doe@example.com',
      birthdate: '1990-01-01',
      passportSeries: '1234',
      passportNumber: '567890',
    };

    (mockUseForm.handleSubmit as vi.Mock).mockImplementation(
      (callback) => (e: React.FormEvent) => {
        e.preventDefault();
        callback(mockData);
      },
    );

    (mockUsePostRequest.axiosPost as vi.Mock).mockResolvedValue({
      status: 200,
      data: [{ applicationId: '12345' }],
    });

    render(<CustomizeCardForm formRef={{ current: null }} />);

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockUsePostRequest.axiosPost).toHaveBeenCalledWith(
        sendCustomizeForm,
        {
          ...mockData,
          term: 6,
          middleName: null,
        },
      );
      expect(store.dispatch).toHaveBeenCalledWith(checkStatus(12345));
    });
  });

  it('handles form validation errors', () => {
    (useForm as vi.Mock).mockReturnValue({
      ...mockUseForm,
      formState: {
        errors: {
          firstName: { message: 'First name is required' },
          email: { message: 'Invalid email' },
        },
      },
    });

    render(<CustomizeCardForm formRef={{ current: null }} />);

    expect(screen.getByText('First name is required')).toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('handles amount change correctly', () => {
    const handleChange = vi.fn();
    (mockUseForm.setValue as vi.Mock).mockImplementation(handleChange);

    render(<CustomizeCardForm formRef={{ current: null }} />);

    const amountInput = screen.getByRole('spinbutton', { name: /amount/i });
    fireEvent.change(amountInput, { target: { value: '200000' } });

    expect(handleChange).toHaveBeenCalledWith('amount', 200000, {
      shouldValidate: true,
    });
  });
});
