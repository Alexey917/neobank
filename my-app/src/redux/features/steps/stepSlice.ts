import { createSlice } from '@reduxjs/toolkit';
import { stepId } from './type';
import { checkStatus } from './statusThunks';

interface IStepState {
  activeStep: stepId;
  loading: boolean;
  error: string | null;
}

const initialStepState: IStepState = {
  activeStep: 'BEGIN',
  loading: false,
  error: null,
};

const stepSlice = createSlice({
  name: 'steps',
  initialState: initialStepState,
  reducers: {
    switchStep: (state, action: { payload: stepId }) => {
      state.activeStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.activeStep = action.payload;
      })
      .addCase(checkStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to check status';
      });
  },
});

export const { switchStep } = stepSlice.actions;

export const stepsReducer = stepSlice.reducer;
