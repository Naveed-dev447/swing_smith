import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


// `HomeNavigation.tsx
import HomeView from '../modules/Dashboard/Home/HomeView';
import SwingLogView from '../modules/Dashboard/Home/SwingLogView';
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
          options={{ headerShown: false }}
          name="SwingLog"
          component={SwingLogView}
        />
      </Stack.Navigator>
  );
};

export default HomeStack;