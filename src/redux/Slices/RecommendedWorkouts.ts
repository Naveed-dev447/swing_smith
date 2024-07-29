import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import { IRecommendedWorkout, IRecommendedWorkoutsResponse } from '../../types/RecommendedWorkouts';

interface RecommendedWorkoutsState {
  workouts: IRecommendedWorkout[];
  recWorkoutLoading: boolean;
  recWorkoutError: string | null;
}

const initialState: RecommendedWorkoutsState = {
  workouts: [],
  recWorkoutLoading: false,
  recWorkoutError: null,
};



export const fetchRecommendedWorkouts = createAsyncThunk(
  'recommendedWorkouts/fetchRecommendedWorkouts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<IRecommendedWorkoutsResponse>('dashboard/recomended-workouts');
      return response.data.data;
    } catch (recWorkoutError: any) {
      return rejectWithValue(recWorkoutError.message || 'Failed to fetch recent analysis');
    }
  }
);

const recommendedWorkoutsSlice = createSlice({
  name: 'recommendedWorkouts',
  initialState,
  reducers: {
    clearRecommendedWorkouts: (state) => {
      state.workouts = [];
      state.recWorkoutError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedWorkouts.pending, (state) => {
        state.recWorkoutLoading = true;
        state.recWorkoutError = null;
      })
      .addCase(fetchRecommendedWorkouts.fulfilled, (state, action: PayloadAction<IRecommendedWorkout[]>) => {
        state.recWorkoutLoading = false;
        state.workouts = action.payload; // Setting the workouts data
      })
      .addCase(fetchRecommendedWorkouts.rejected, (state, action) => {
        state.recWorkoutLoading = false;
        state.recWorkoutError = action.payload as string || 'Failed to fetch recommended workouts'; // Handling errors
      });
  },
});

export const { clearRecommendedWorkouts } = recommendedWorkoutsSlice.actions;
export default recommendedWorkoutsSlice.reducer;
