import { useAppSelector } from '@/store/hooks';
import { createSlice } from '@reduxjs/toolkit';

type ThemeType = {
  mode: 'dark' | '';
  showBackdrop: boolean;
};

const initialState: ThemeType = {
  mode: 'dark',
  showBackdrop: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.mode = state.mode === 'dark' ? '' : 'dark';
      return state;
    },
    showBackdrop: (state) => {
      state.showBackdrop = true;
      return state;
    },
    hideBackdrop: (state) => {
      state.showBackdrop = false;
      return state;
    },
  },
});

export const useThemeSelector = () => {
  return useAppSelector((state) => state.theme);
};
export const { switchTheme, showBackdrop, hideBackdrop } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
