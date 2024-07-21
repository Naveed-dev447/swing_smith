import React from 'react';
import { LogBox, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { darkTheme, lightTheme } from '../theme/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../shared/Utils/navigationRef';

// RootNavigation.tsx
import LogInView from '../modules/Login/LoginView';
import SplashView from '../modules/Splash/SplashView';
import OnboardStack from './OnboardStack';
import RegisterView from '../modules/Register/RegisterView';
import BottomTabNavigator from './BottomTabStack';
import { LoaderProvider } from '../config/LoaderContext';
import Toast from 'react-native-toast-message';

import VideoUpload1 from '../modules/VideoUpload/videoUpload1.tsx';
import VideoUpload2 from './../modules/VideoUpload/videoUpload2';
import VideoUpload3 from './../modules/VideoUpload/videoUpload3';
import VideoUpload4 from './../modules/VideoUpload/videoUpload4';
import VideoUpload5 from './../modules/VideoUpload/VideoUpload5';
import UploadVideo from './../modules/Onboarding/Home/uploadVideo.tsx';
import DTLView from './../modules/Onboarding/Home/DTLView.tsx';
import SwingAnalysis from './../modules/Dashboard/Analysis/SwingAnalysis.tsx';
import HomeView from './../modules/Dashboard/Home/HomeView.tsx';
import SwingLogView from './../modules/Dashboard/Home/SwingLogView.tsx';
import AnalysisView from './../modules/Dashboard/Analysis/AnalysisView.tsx';

import { toastConfig } from '../config/ToastConfig';
import WorkoutView from '../modules/Dashboard/Workout/WorkoutView.tsx';
import LowerBodyStrength from '../modules/Dashboard/Workout/LowerBodyStrength.tsx';
import Flexibility from '../modules/Dashboard/Workout/Flexibility.tsx';
import CongratulationModal from '../components/CongratulationModal.tsx';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const colorScheme = useColorScheme();
  LogBox.ignoreAllLogs();
  return (
    <LoaderProvider>
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Splash"
            component={SplashView}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LogInView}
          />
          <Stack.Screen
            name="RegisterView"
            options={{ headerShown: false }}
            component={RegisterView}
          />
          <Stack.Screen
            name="Onboard"
            options={{ headerShown: false }}
            component={OnboardStack}
          />
          <Stack.Screen
            name="BottomTabStack"
            options={{ headerShown: false }}
            component={BottomTabNavigator}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="OnboardHome7"
            component={DTLView}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="OnboardHome8"
            component={VideoUpload1}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="OnboardHome9"
            component={VideoUpload2}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="OnboardHome10"
            component={VideoUpload3}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="OnboardHome11"
            component={VideoUpload4}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="OnboardHome12"
            component={UploadVideo}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="OnboardHome13"
            component={VideoUpload5}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SwingAnalysis"
            component={SwingAnalysis}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeScreen"
            component={HomeView}
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
          <Stack.Screen
            options={{ headerShown: false }}
            name="WorkoutView"
            component={WorkoutView}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="LowerBodyStrength"
            component={LowerBodyStrength}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Flexibility"
            component={Flexibility}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Congratulation"
            component={CongratulationModal}
          />

        </Stack.Navigator>

        <Toast config={toastConfig} />
      </NavigationContainer>
    </LoaderProvider>
  );
};

export default RootNavigation;
