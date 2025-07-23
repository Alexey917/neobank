import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { tabsReducer, stepsReducer } from './tabSlice';

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    steps: stepsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
