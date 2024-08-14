import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import { IFirstLoginResponse } from '../../types/FirstLoginStatus';

interface FirstLoginState {
  isFirstLogin: boolean | null;
  loading: boolean;
  error: string | null;
}

const initialState: FirstLoginState = {
  isFirstLogin: null,
  loading: false,
  error: null,
};

export const fetchFirstLoginStatus = createAsyncThunk(
  'auth/fetchFirstLoginStatus',
  async () => {
    const response = await apiClient.get<IFirstLoginResponse>('/is-first-login');
    console.log("API response", response.data);

    return response.data.isFirstLogin;
  }
);

const firstLoginSlice = createSlice({
  name: 'firstLogin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirstLoginStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFirstLoginStatus.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.loading = false;
        state.isFirstLogin = action.payload;
      })
      .addCase(fetchFirstLoginStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch first login status';
      });
  },
});

export default firstLoginSlice.reducer;
