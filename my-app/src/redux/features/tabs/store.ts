import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './tabSlice';

export const store = configureStore({
  reducer: {
    tabs: tabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
