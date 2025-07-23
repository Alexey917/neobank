import { createSlice } from '@reduxjs/toolkit';
import { stepId, TabId } from './type';
import { checkStatus } from './statusThunks';

interface ITabState {
  activeTab: TabId;
}

interface IStepState {
  activeStep: stepId;
  loading: boolean;
  error: string | null;
}

const initialTabState: ITabState = {
  activeTab: 'About card',
};

const initialStepState: IStepState = {
  activeStep: 'BEGIN',
  loading: false,
  error: null,
};

const tabSlice = createSlice({
  name: 'tabs',
  initialState: initialTabState,
  reducers: {
    switchTab: (state, action: { payload: TabId }) => {
      state.activeTab = action.payload;
    },
  },
});

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

export const { switchTab } = tabSlice.actions;
export const { switchStep } = stepSlice.actions;

export const tabsReducer = tabSlice.reducer;
export const stepsReducer = stepSlice.reducer;
