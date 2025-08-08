import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { SupportForm } from './SupportForm';
import { vi } from 'vitest';
import { getSubscription } from '../../API/api';
import { AxiosResponse, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { useEmailValidation } from '../../hooks/useEmailValidation';

// vi.mock('../../API/api', () => ({
//   getSubscription: () => ({
//     __esModule: true,
//     default: 'test@example.com',
//   }),
// }));

vi.mock('../../API/api', () => ({
  getSubscription: vi.fn(), // Теперь это мок-функция
}));

vi.mock('../../hooks/useEmailValidation', () => ({
  useEmailValidation: vi.fn(() => ({
    emailValidation: vi.fn(),
    errorLabel: '',
    canSend: false,
    value: 'test@example.com',
  })),
}));

const localStorageMock = {
  setItem: vi.fn(),
  getItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

const mockSetIsSubscribed = vi.fn();
const mockAxiosPost = vi.fn();

const mockedGetSubscription = vi.mocked(getSubscription);

describe('', () => {
  it('renders correctly', () => {
    render(
      <SupportForm
        setIsSubscribed={mockSetIsSubscribed}
        axiosPost={mockAxiosPost}
      />,
    );

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByLabelText('Your email')).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    mockedGetSubscription.mockResolvedValueOnce({
      data: {}, // Основные данные ответа
      status: 200, // Код статуса
      statusText: 'OK', // Текст статуса
      headers: {}, // Обязательные заголовки
      config: {
        headers: {} as AxiosHeaders, // Заголовки конфига
        // Другие обязательные поля конфига
      } as InternalAxiosRequestConfig,
    } as AxiosResponse);

    render(
      <SupportForm
        setIsSubscribed={mockSetIsSubscribed}
        axiosPost={mockAxiosPost}
      />,
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockedGetSubscription).toHaveBeenCalledWith('test@example.com');
      expect(mockSetIsSubscribed).toHaveBeenCalledWith(true);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'subscribed_email',
        'You are now subscribed to the newsletter.',
      );
    });
  });

  it('disables button when canSend is true', () => {
    // Переопределяем мок хука
    vi.mocked(useEmailValidation).mockImplementation(() => ({
      emailValidation: vi.fn(),
      errorLabel: '',
      canSend: true,
      value: 'test@example.com',
    }));

    render(
      <SupportForm
        setIsSubscribed={mockSetIsSubscribed}
        axiosPost={mockAxiosPost}
      />,
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows error message when validation fails', () => {
    vi.mocked(useEmailValidation).mockImplementation(() => ({
      emailValidation: vi.fn(),
      errorLabel: 'Invalid email',
      canSend: false,
      value: 'test@example.com',
    }));

    render(
      <SupportForm
        setIsSubscribed={mockSetIsSubscribed}
        axiosPost={mockAxiosPost}
      />,
    );
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
