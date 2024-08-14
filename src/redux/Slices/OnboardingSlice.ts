// src/redux/Slices/OnboardingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoData } from '../../types/UploadVideo';

interface OnboardingState {
  skillLevel: string | null;
  aspectToImprove: string | null;
  coachingLesson: string | null;
  equipmentType: string | null;
  practiceDuration: string | null;
  scoringAverage: number;
  uploadedVideo: IVideoData | null;
  dtlSelectedOption: string | null;
  videoHandedness: string | null;
  selectedEquipment: string | null;
  selectedEquipment2: string | null;
  durationGolf: string;

}

const initialState: OnboardingState = {
  skillLevel: null,
  aspectToImprove: null,
  coachingLesson: null,
  equipmentType: null,
  practiceDuration: null,
  scoringAverage: 0,
  uploadedVideo: null,
  dtlSelectedOption: null,
  videoHandedness: null,
  selectedEquipment: null,
  selectedEquipment2: null,
  durationGolf: ''
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setSkillLevel: (state, action: PayloadAction<string>) => {
      state.skillLevel = action.payload;
    },
    setAspectToImprove: (state, action: PayloadAction<string>) => {
      state.aspectToImprove = action.payload;
    },
    setCoachingLesson: (state, action: PayloadAction<string>) => {
      state.coachingLesson = action.payload;
    },
    setEquipmentType: (state, action: PayloadAction<string>) => {
      state.equipmentType = action.payload;
    },
    setDurationGolf: (state, action: PayloadAction<string>) => {
      state.durationGolf = action.payload;
    },
    setPracticeDuration: (state, action: PayloadAction<string>) => {
      state.practiceDuration = action.payload;
    },
    setScoringAverage: (state, action: PayloadAction<number>) => {
      state.scoringAverage = action.payload;
    },
    setUploadedVideo: (state, action: PayloadAction<string>) => {
      state.uploadedVideo = action.payload;
    },
    setDtlSelectedOption: (state, action: PayloadAction<string>) => {
      state.dtlSelectedOption = action.payload;
    },
    setVideoHandedness: (state, action: PayloadAction<string>) => {
      state.videoHandedness = action.payload;
    },
    setCLubEquipment: (state, action: PayloadAction<string>) => {
      state.selectedEquipment2 = action.payload;
    },
    setCLubEquipment2: (state, action: PayloadAction<string>) => {
      state.selectedEquipment2 = action.payload;
    },
  },
});

export const {
  setSkillLevel,
  setAspectToImprove,
  setCoachingLesson,
  setEquipmentType,
  setDurationGolf,
  setPracticeDuration,
  setScoringAverage,
  setUploadedVideo,
  setDtlSelectedOption,
  setVideoHandedness,
  setCLubEquipment,
  setCLubEquipment2
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
