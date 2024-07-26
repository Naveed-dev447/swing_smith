import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import { SwingAnalysis, SwingAnalysisResponse } from '../../types/SwingAnalysis';

interface SwingAnalysisState {
    swingAnalysis: SwingAnalysisResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: SwingAnalysisState = {
    swingAnalysis: null,
    loading: false,
    error: null,
};

export const fetchSwingAnalysis = createAsyncThunk('swingAnalysis/fetchSwingAnalysis', async (id: number) => {
    const response = await apiClient.get<SwingAnalysisResponse>(`/video/details/${id}`);
    return response.data;
});

const swingAnalysisSlice = createSlice({
    name: 'swingAnalysis',
    initialState,
    reducers: {
        resetSwingAnalysisState: (state) => {
            state.swingAnalysis = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSwingAnalysis.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSwingAnalysis.fulfilled, (state, action: PayloadAction<SwingAnalysisResponse>) => {
                state.loading = false;
                state.swingAnalysis = action.payload;
            })
            .addCase(fetchSwingAnalysis.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch swing analysis';
            });
    },
});

export const { resetSwingAnalysisState } = swingAnalysisSlice.actions;

export default swingAnalysisSlice.reducer;
