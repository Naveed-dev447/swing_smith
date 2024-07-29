import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../config/client';
import { IProfile, IProfileResponse } from '../../types/Profile';

interface ProfileState {
  profiles: IProfile[];
  profileLoading: boolean;
  profileError: string | null;
}

const initialState: ProfileState = {
  profiles: [],
  profileLoading: false,
  profileError: null,
};

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<IProfileResponse>('/account/profile');
    return response.data.data;
  } catch (profileError) {
    return rejectWithValue(profileError);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<IProfile[]>) => {
        state.profileLoading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload as string || 'Failed to fetch profile';
      });
  },
});

export default profileSlice.reducer;
