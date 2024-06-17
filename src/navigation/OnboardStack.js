import React from 'react';
import { LogBox, StyleSheet, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


// RootNavigation.tsx
import ScoringView from '../modules/Onboarding/Home/ScoringView';
import GolfDurationView from '../modules/Onboarding/Home/GolfDurationView';
import SkillLevel from '../modules/Onboarding/Home/SkillLevel'
import GameImproveView from '../modules/Onboarding/Home/GameImproveView'
import CoachingLessonView from '../modules/Onboarding/Home/CoachingLessonView'
import EquipmentsView from '../modules/Onboarding/Home/EquipmentsView'
import DTLView from '../modules/Onboarding/Home/DTLView'

const Stack = createStackNavigator();

const RootNavigation= () => {
  LogBox.ignoreAllLogs();
  return (
      <Stack.Navigator initialRouteName="OnboardHome">
        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardHome1"
          component={ScoringView}
        />
          <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardHome2"
          component={GolfDurationView}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardHome3"
          component={SkillLevel}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardHome4"
          component={GameImproveView}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardHome5"
          component={CoachingLessonView}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardHome6"
          component={EquipmentsView}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardHome7"
          component={DTLView}
        />

      </Stack.Navigator>
  );
};

export default RootNavigation;