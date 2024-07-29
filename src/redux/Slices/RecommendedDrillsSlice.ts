// src/redux/Slices/RecommendedDrillsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import { RecommendedDrill } from '../../types/RecommededDrills';

interface RecommendedDrillsState {
  recommendedDrills: RecommendedDrill[];
  loading: boolean;
  error: string | null;
}

const initialState: RecommendedDrillsState = {
  recommendedDrills: [],
  loading: false,
  error: null,
};

export const fetchRecommendedDrills = createAsyncThunk('recommendedDrills/fetchRecommendedDrills', async () => {
  const response = await apiClient.get<RecommendedDrill[]>('/dashboard/recomended-golf-drills');
  return response.data;
});

const recommendedDrillsSlice = createSlice({
  name: 'recommendedDrills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedDrills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedDrills.fulfilled, (state, action: PayloadAction<RecommendedDrill[]>) => {
        state.loading = false;
        state.recommendedDrills = action.payload;
      })
      .addCase(fetchRecommendedDrills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recommended drills';
      });
  },
});

export default recommendedDrillsSlice.reducer;
