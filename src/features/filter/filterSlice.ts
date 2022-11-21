import { useAppSelector } from '@/store/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './types';

const initialState: FilterState = {
  mediaType: 'movie',
  searchType: 'multi',
  searchHistory: [],
  discoverFilter: {
    type: 'movie',
    sort_by: null,
    with_genres: null,
    'release_date.gte': null,
    'release_date.lte': null,
    'vote_average.gte': null,
    'vote_average.lte': null,
    'with_runtime.gte': null,
    'with_runtime.lte': null,
  } as const,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeMediaType: (
      state,
      action: PayloadAction<FilterState['mediaType']>
    ) => {
      state.mediaType = action.payload;
      return state;
    },
    updateSearchHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = state.searchHistory
        .filter((s) => s.name.trim() !== '' && s.name !== action.payload)
        .slice(0, 8);

      state.searchHistory.unshift({
        id: action.payload,
        name: action.payload,
      });

      return state;
    },
    updateDiscoverFilter: (
      state,
      action: PayloadAction<Partial<FilterState['discoverFilter']>>
    ) => {
      state.discoverFilter = { ...state.discoverFilter, ...action.payload };
      return state;
    },
  },
});

export const { changeMediaType, updateSearchHistory, updateDiscoverFilter } =
  filterSlice.actions;
export const useFilterSelector = () => {
  return useAppSelector((state) => state.filter);
};

export const filterReducer = filterSlice.reducer;
