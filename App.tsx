import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux';
import RootStackNavigation from './src/navigation/RootStack'
import Store from './src/redux/Store';
import { getFcmToken, registerListenerWithFCM } from './src/shared/Utils/FcmHelper/index';

const App: React.FC = () => {
  useEffect(() => {
    getFcmToken();
  }, []);

  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);
  return (
    <Provider store={Store}>
      <RootStackNavigation />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})