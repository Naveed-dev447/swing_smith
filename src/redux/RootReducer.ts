// src/redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import TutorialReducer from './Slices/TutorialSlice';

const appReducer = combineReducers({
  tutorials: TutorialReducer,
});

const RootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default RootReducer;
