import { createSlice } from '@reduxjs/toolkit';
import { TabId } from './type';

interface ITabState {
  activeTab: TabId;
}

const initialState: ITabState = {
  activeTab: 'About card',
};

const tabSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    switchTab: (state, action: { payload: TabId }) => {
      state.activeTab = action.payload;
    },
  },
});

export const { switchTab } = tabSlice.actions;
export default tabSlice.reducer;
