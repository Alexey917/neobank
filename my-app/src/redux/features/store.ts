import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { stepsReducer } from './steps/stepSlice';
import { tabsReducer } from './tabs/tabSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Использует localStorage

// Конфиг для сохранения состояния `steps`
const persistConfig = {
  key: 'steps',
  storage,
  whitelist: ['activeStep'], // Сохраняем только `activeStep`
};

const persistedStepsReducer = persistReducer(persistConfig, stepsReducer);

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    steps: persistedStepsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку для redux-persist
    }),
});

export const getStep = (state: RootState) => state.steps;
export const getTab = (state: RootState) => state.tabs;

export const persistor = persistStore(store); // Для PersistGate
export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
