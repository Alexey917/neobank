import { createAsyncThunk } from '@reduxjs/toolkit';
import { applicationStatus } from '../../../API/api';
import { switchStep } from './tabSlice';

export const checkStatus = createAsyncThunk(
  'status/check',
  async (id: number, { dispatch }) => {
    const response = await applicationStatus(id);
    dispatch(switchStep(response.data.status));
    return response.data.status; // Можно вернуть результат
  },
);
