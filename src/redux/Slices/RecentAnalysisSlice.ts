import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import { IRecentAnalysis, IRecentAnalysisResponse } from '../../types/RecentAnalysis';

interface RecentAnalysisState {
  data: IRecentAnalysis[];
  analysisloading: boolean;
  analysisError: string | null;
}

const initialState: RecentAnalysisState = {
  data: [],
  analysisloading: false,
  analysisError: null,
};

export const fetchRecentAnalysis = createAsyncThunk(
  'recentAnalysis/fetchRecentAnalysis',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<IRecentAnalysisResponse>('/dashboard/recent-analysis');
      return response.data.data;
    } catch (analysisError: any) {
      return rejectWithValue(analysisError.message || 'Failed to fetch recent analysis');
    }
  }
);

const recentAnalysisSlice = createSlice({
  name: 'recentAnalysis',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentAnalysis.pending, (state) => {
        state.analysisloading = true;
        state.analysisError = null;
      })
      .addCase(fetchRecentAnalysis.fulfilled, (state, action: PayloadAction<IRecentAnalysis[]>) => {
        state.analysisloading = false;
        state.data = action.payload;
      })
      .addCase(fetchRecentAnalysis.rejected, (state, action) => {
        state.analysisloading = false;
        state.analysisError = action.payload as string || 'Failed to fetch recent analysis';
      });
  },
});

export default recentAnalysisSlice.reducer;
