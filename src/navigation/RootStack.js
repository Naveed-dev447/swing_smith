import React from 'react';
import { LogBox, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../shared/Utils/navigationRef';

// RootNavigation.tsx
import LogInView from '../modules/Login/LoginView';
import SplashView from '../modules/Splash/SplashView';
import OnboardStack from './OnboardStack';
import RegisterView from '../modules/Register/RegisterView';


const Stack = createStackNavigator();

const RootNavigation = () => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={SplashView}
        />
        <Stack.Screen name="Login"  options={{ headerShown: false }} component={LogInView} />
        <Stack.Screen name="RegisterView"  options={{ headerShown: false }} component={RegisterView} />
        <Stack.Screen name="Onboard"
          options={{ headerShown: false }}
          component={OnboardStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;