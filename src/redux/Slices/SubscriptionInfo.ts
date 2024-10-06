
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import {  IInfoSubscription,IInfoSubscriptionResponse } from '../../types/SubscriptionInfo';
import { ShowToast } from '../../components/ShowToast';

interface SubscriptionState {
  subscriptions: IInfoSubscription[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscriptions: [],
  loading: false,
  error: null,
};

export const fetchSubscriptionInfo = createAsyncThunk(
  'subscriptions/fetchSubscriptionInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<IInfoSubscriptionResponse>('account/subscription/info');
      return response.data.subscription; 
    } catch (error: any) {
      ShowToast('error', `${error.response.data.message}`);
      const errorMessage = error.response?.data?.error?.message || 'An unexpected error occurred';
      console.error('Get Subscription Info API error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Create the slice
const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    clearSubscriptions: (state) => {
      state.subscriptions = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptionInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearSubscriptions } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
