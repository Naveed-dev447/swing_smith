// store/slices/subscriptionPlanSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import { ISubscriptionPlan, ISubscriptionPlanResponse } from '../../types/Subscription';

interface SubscriptionPlanState {
  plans: ISubscriptionPlan[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionPlanState = {
  plans: [],
  loading: false,
  error: null,
};

export const fetchSubscriptionPlans = createAsyncThunk(
  'subscriptionPlans/fetchSubscriptionPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<ISubscriptionPlanResponse>('/subscription/plans');
      return response.data.plans;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subscription plans');
    }
  }
);

const subscriptionPlanSlice = createSlice({
  name: 'subscriptionPlans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionPlans.fulfilled, (state, action: PayloadAction<ISubscriptionPlan[]>) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchSubscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch subscription plans';
      });
  },
});

export default subscriptionPlanSlice.reducer;
