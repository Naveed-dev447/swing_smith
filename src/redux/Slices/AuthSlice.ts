// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../config/client';
import { ILogin, ILoginResponse } from '../../types/Login';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async (payload: ILogin) => {
  const response = await apiClient.post<ILoginResponse>('login', payload);
  await AsyncStorage.setItem('Token', response.data.data.token);
  return response.data.data;
});

// export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
//   await AsyncStorage.removeItem('Token');
//   dispatch({ type: 'RESET' });
// });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      });
  },
});

export default authSlice.reducer;
