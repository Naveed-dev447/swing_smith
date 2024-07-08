import React from 'react';
import {LogBox, StyleSheet, Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import ScoringView from '../modules/Onboarding/Home/ScoringView';
import GolfDurationView from '../modules/Onboarding/Home/GolfDurationView';
import SkillLevel from '../modules/Onboarding/Home/SkillLevel';
import GameImproveView from '../modules/Onboarding/Home/GameImproveView';
import CoachingLessonView from '../modules/Onboarding/Home/CoachingLessonView';
import EquipmentsView from '../modules/Onboarding/Home/EquipmentsView';
import DTLView from '../modules/Onboarding/Home/DTLView';
import videoUpload1 from '../modules/VideoUpload/videoUpload1';
import VideoUpload2 from './../modules/VideoUpload/videoUpload2';
import VideoUpload3 from './../modules/VideoUpload/videoUpload3';
import VideoUpload4 from './../modules/VideoUpload/videoUpload4';
import UploadVideo from './../modules/Onboarding/Home/uploadVideo.tsx';
import SwingAnalysis from './../modules/Dashboard/Analysis/SwingAnalysis.tsx';

const Stack = createStackNavigator();

const RootNavigation = () => {
  LogBox.ignoreAllLogs();
  return (
    <Stack.Navigator initialRouteName="OnboardHome">
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome1"
        component={ScoringView}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome2"
        component={GolfDurationView}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome3"
        component={SkillLevel}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome4"
        component={GameImproveView}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome5"
        component={CoachingLessonView}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome6"
        component={EquipmentsView}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome7"
        component={DTLView}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome8"
        component={videoUpload1}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome9"
        component={VideoUpload2}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome10"
        component={VideoUpload3}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome11"
        component={VideoUpload4}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome12"
        component={UploadVideo}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SwingAnalysis"
        component={SwingAnalysis}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
