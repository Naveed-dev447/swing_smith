
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import { IRecommendedDrill, IRecommendedDrillResponse } from '../../types/RecommededDrills';

interface RecommendedDrillsState {
  drills: IRecommendedDrill[];
  drillsLoading: boolean;
  drillsError: string | null;
}

const initialState: RecommendedDrillsState = {
  drills: [],
  drillsLoading: false,
  drillsError: null,
};

export const fetchRecommendedDrills = createAsyncThunk(
  'recommendedDrills/fetchRecommendedDrills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<IRecommendedDrillResponse>('dashboard/recomended-golf-drills');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch recommended golf drills');
    }
  }
);

// Create slice
const recommendedDrillsSlice = createSlice({
  name: 'recommendedDrills',
  initialState,
  reducers: {
    clearRecommendedGolfDrills: (state) => {
      state.drills = [];
      state.drillsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedDrills.pending, (state) => {
        state.drillsLoading = true;
        state.drillsError = null;
      })
      .addCase(fetchRecommendedDrills.fulfilled, (state, action: PayloadAction<IRecommendedDrill[]>) => {
        state.drillsLoading = false;
        state.drills = action.payload;
      })
      .addCase(fetchRecommendedDrills.rejected, (state, action) => {
        state.drillsLoading = false;
        state.drillsError = action.payload as string || 'Failed to fetch recommended golf drills'; // Handling errors
      });
  },
});

export const { clearRecommendedGolfDrills } = recommendedDrillsSlice.actions;
export default recommendedDrillsSlice.reducer;
