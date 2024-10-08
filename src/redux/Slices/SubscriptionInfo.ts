import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import { IInfoSubscription, IInfoSubscriptionResponse } from '../../types/SubscriptionInfo';
import { ShowToast } from '../../components/ShowToast';

// Redux state and slice
interface SubscriptionState {
  subscription: IInfoSubscription | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscription: null,
  loading: false,
  error: null,
};

export const fetchSubscriptionInfo = createAsyncThunk(
  'subscription/fetchSubscriptionInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<IInfoSubscriptionResponse>('account/subscription/info');
      if (response.data?.message) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error?.message || 'An unexpected error occurred';
      console.error('Get Subscription Info API error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Create the slice
const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearSubscription: (state) => {
      state.subscription = null;
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
        state.subscription = action.payload;
      })
      .addCase(fetchSubscriptionInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
