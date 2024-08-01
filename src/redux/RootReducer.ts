import { combineReducers } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import TutorialReducer from './Slices/TutorialSlice';
import OnboardingReducer from './Slices/OnboardingSlice';
import SwingLogReducer from './Slices/SwingLogSlice';
import SwingAnalysisReducer from './Slices/SwingAnalysisSlice';
import ProfileReducer from './Slices/ProfileSlice';
import RecommendedDrillsReducer from './Slices/RecommendedDrillsSlice';
import RecentAnalysisReducer from './Slices/RecentAnalysisSlice';
import RecommendedWorkoutsReducer from './Slices/RecommendedWorkouts';
import AuthSlice from './Slices/AuthSlice';

const appReducer = combineReducers({
  auth: AuthSlice,
  tutorials: TutorialReducer,
  onboarding: OnboardingReducer,
  swingLogs: SwingLogReducer,
  swingAnalysis: SwingAnalysisReducer,
  profile: ProfileReducer,
  recommendedDrills: RecommendedDrillsReducer,
  recentAnalysis: RecentAnalysisReducer,
  recommendedWorkout: RecommendedWorkoutsReducer
});

const RootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default RootReducer;
