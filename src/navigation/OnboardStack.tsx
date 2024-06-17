import React from 'react';
import { LogBox, StyleSheet, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


// RootNavigation.tsx
import ScoringView from '../modules/Onboarding/Home/ScoringView';
import GolfDurationView from '../modules/Onboarding/Home/GolfDurationView';
import SkillLevel from '../modules/Onboarding/Home/SkillLevel';
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
      </Stack.Navigator>
  );
};

export default RootNavigation;