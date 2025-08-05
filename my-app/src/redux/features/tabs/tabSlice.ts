import { createSlice } from '@reduxjs/toolkit';
import { TabId } from './type';

interface ITabState {
  activeTab: TabId;
}

const initialTabState: ITabState = {
  activeTab: 'About card',
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

export const { switchTab } = tabSlice.actions;

export const tabsReducer = tabSlice.reducer;
