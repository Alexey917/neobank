import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { CardOffer } from './CardOffer';
import { IOffer } from '../../types/types';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { tabsReducer } from '../../redux/features/tabs/tabSlice';
import { stepsReducer } from '../../redux/features/steps/stepSlice';

import { selectedOffer } from '../../API/api';
import { checkStatus } from '../../redux/features/steps/statusThunks';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

vi.mock('../../API/api', () => ({
  selectedOffer: vi.fn(() =>
    Promise.resolve({
      status: 200,
      data: {},
      statusText: 'OK',
      headers: {},
      config: {},
    }),
  ),
}));

vi.mock('../../redux/features/steps/statusThunks', () => ({
  checkStatus: Object.assign(
    vi.fn(() => ({ type: 'checkStatus/pending' })),
    {
      pending: { type: 'checkStatus/pending' },
      fulfilled: { type: 'checkStatus/fulfilled' },
      rejected: { type: 'checkStatus/rejected' },
    },
  ),
}));

const mockOffer: IOffer = {
  requestedAmount: 100000,
  totalAmount: 120000,
  term: 12,
  monthlyPayment: 10000,
  rate: 10,
  isInsuranceEnabled: true,
  isSalaryClient: false,
  applicationId: 123,
};

const mockUseSelectedOffer = vi.mocked(selectedOffer);
const mockCheckStatus = vi.mocked(checkStatus);

const mockStore = configureStore({
  reducer: {
    tabs: () => tabsReducer,
    steps: () => stepsReducer,
  },
});

describe('CardOffer component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render item', () => {
    render(
      <Provider store={mockStore}>
        <CardOffer item={mockOffer} />
      </Provider>,
    );

    expect(
      screen.getByText(`Requested amount: ${mockOffer.requestedAmount} ₽`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Total amount: ${mockOffer.totalAmount} ₽`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`For ${mockOffer.term} months`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Monthly payment: ${mockOffer.monthlyPayment} ₽`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Your rate: ${mockOffer.rate} %`),
    ).toBeInTheDocument();
  });

  it('displays correct icons based on conditions', () => {
    render(
      <Provider store={mockStore}>
        <CardOffer item={mockOffer} />
      </Provider>,
    );

    const insuranceItem = screen.getByText('Insurance included').closest('li');
    const insuranceIcon = insuranceItem?.querySelector('svg use');
    expect(insuranceIcon).toHaveAttribute(
      'href',
      expect.stringContaining('#ok'),
    );

    const salaryItem = screen.getByText('Salary client').closest('li');
    const salaryIcon = salaryItem?.querySelector('svg use');
    expect(salaryIcon).toHaveAttribute(
      'href',
      expect.stringContaining('#error'),
    );
  });

  it('display img', () => {
    render(
      <Provider store={mockStore}>
        <CardOffer item={mockOffer} />
      </Provider>,
    );

    const img = screen.getByAltText('offer-image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('offerBox'));
  });

  it('click button - success case', async () => {
    const mockSuccessResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    } as AxiosResponse;
    mockUseSelectedOffer.mockResolvedValue(mockSuccessResponse);

    render(
      <Provider store={mockStore}>
        <CardOffer item={mockOffer} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Select'));

    await waitFor(() => {
      expect(mockUseSelectedOffer).toHaveBeenCalledWith(mockOffer);
    });

    await waitFor(() => {
      expect(mockCheckStatus).toHaveBeenCalledWith(mockOffer.applicationId);
    });
  });

  it('click button - error case', async () => {
    mockUseSelectedOffer.mockRejectedValueOnce(new Error('API error'));

    render(
      <Provider store={mockStore}>
        <CardOffer item={mockOffer} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Select'));

    await waitFor(() => {
      expect(mockCheckStatus).not.toHaveBeenCalled();
    });
  });
});
