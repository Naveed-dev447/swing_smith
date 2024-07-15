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


const Stack = createStackNavigator();

const RootNavigation = () => {
  const colorScheme = useColorScheme();
  LogBox.ignoreAllLogs();
  return (
    <LoaderProvider>
    <NavigationContainer ref={navigationRef} theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={SplashView}
        />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LogInView} />
        <Stack.Screen name="RegisterView" options={{ headerShown: false }} component={RegisterView} />
        <Stack.Screen name="Onboard"
          options={{ headerShown: false }}
          component={OnboardStack} />
        <Stack.Screen name="BottomTabStack"
          options={{ headerShown: false }}
          component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </LoaderProvider>
  );
};

export default RootNavigation;