import React from 'react';
import { LogBox, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../shared/Utils/navigationRef';

// RootNavigation.tsx
import LogInView from '../modules/Login/LoginView';
import SplashView from '../modules/Splash/SplashView';
import RegisterView from '../modules/Register/RegisterView';


const Stack = createStackNavigator();

const RootNavigation= () => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none" initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashView}
        />
        <Stack.Screen name="Login" component={LogInView} />
        <Stack.Screen name="RegisterView" component={RegisterView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;