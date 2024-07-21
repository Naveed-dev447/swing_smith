// src/redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import TutorialReducer from './Slices/TutorialSlice';
import OnboardingReducer from './Slices/OnboardingSlice';
import SwingLogReducer from './Slices/SwingLogSlice';
import SwingAnalysisReducer from './Slices/SwingAnalysisSlice';

const appReducer = combineReducers({
  tutorials: TutorialReducer,
  onboarding: OnboardingReducer,
  swingLogs: SwingLogReducer,
  swingAnalysis: SwingAnalysisReducer

});

const RootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default RootReducer;
