import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import { ITutorial, ITutorialResponse } from '../../types/Tutorial';

interface TutorialsState {
  tutorials: ITutorial[];
  loading: boolean;
  error: string | null;
}

const initialState: TutorialsState = {
  tutorials: [],
  loading: false,
  error: null,
};

export const fetchTutorials = createAsyncThunk('tutorials/fetchTutorials', async () => {
  const response = await apiClient.get<ITutorialResponse>('/tutorials');

  return response.data.data;
});

const tutorialsSlice = createSlice({
  name: 'tutorials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTutorials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorials.fulfilled, (state, action: PayloadAction<ITutorial[]>) => {
        state.loading = false;
        state.tutorials = action.payload;
      })
      .addCase(fetchTutorials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tutorials';
      });
  },
});

export default tutorialsSlice.reducer;
