import { useAppSelector } from '@/store/hooks';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser } from './api/getUser';

export type User = {
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string | null;
  uid: string;
};

type TAuthSlice = {
  user: User | null;
};

const initialState: TAuthSlice = {
  user: null,
};

export const getUpdatedUser = createAsyncThunk(
  'auth/getUpdatedUser',
  async () => {
    return await getUser();
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      return state;
    },
    logout: (state) => {
      state.user = null;
      return state;
    },
    updateUser: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getUpdatedUser.fulfilled, (state, action) => {
      state.user = action.payload;
      return state;
    });
  },
});

export const { login, logout } = authSlice.actions;
export const useAuthSelector = () => {
  return useAppSelector((state) => state.auth);
};
export const authReducer = authSlice.reducer;
