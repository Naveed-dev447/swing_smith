import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import { SwingLog, SwingLogApiResponse } from '../../types/SwingLog';


interface SwingLogsState {
  swingLogs: SwingLog[];
  loading: boolean;
  error: string | null;
}

const initialState: SwingLogsState = {
  swingLogs: [],
  loading: false,
  error: null,
};

export const fetchSwingLogs = createAsyncThunk('swingLogs/fetchSwingLogs', async () => {
  const response = await apiClient.get<SwingLogApiResponse>('/video/all');
  console.log("SwingLog API response", response.data);

  // Return only the data field
  return response.data.data;
});

const swingLogsSlice = createSlice({
  name: 'swingLogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwingLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSwingLogs.fulfilled, (state, action: PayloadAction<SwingLog[]>) => {
        state.loading = false;
        state.swingLogs = action.payload;
      })
      .addCase(fetchSwingLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch swing logs';
      });
  },
});

export default swingLogsSlice.reducer;
