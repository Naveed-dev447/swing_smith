import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import { ITutorialResponse } from '../../types/Tutorial';

interface TutorialsState {
  tutorials: ITutorialResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: TutorialsState = {
  tutorials: [],
  loading: false,
  error: null,
};

export const fetchTutorials = createAsyncThunk('tutorials/fetchTutorials', async () => {
  const response = await apiClient.get<ITutorialResponse[]>('/tutorials');
  console.log("Tutorial API responsee", response.data);
  
  return response.data;
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
      .addCase(fetchTutorials.fulfilled, (state, action: PayloadAction<ITutorialResponse[]>) => {
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
