import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


// `HomeNavigation.tsx
import HomeView from '../modules/Dashboard/Home/HomeView';
import SwingLogView from '../modules/Dashboard/Home/SwingLogView';
import AnalysisView from '../modules/Dashboard/Analysis/AnalysisView';
import UploadVideo from '../modules/Onboarding/Home/uploadVideo';
const Stack = createStackNavigator();

const HomeStack= () => {
  return (
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
         options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeView}
        />
           <Stack.Screen
        options={{headerShown: false}}
        name="OnboardHome12"
        component={UploadVideo}
      />
          <Stack.Screen
          options={{ headerShown: false }}
          name="SwingLog"
          component={SwingLogView}
        />
            <Stack.Screen
          options={{ headerShown: false }}
          name="AnalysisView"
          component={AnalysisView}
        />
      </Stack.Navigator>
  );
};

export default HomeStack;