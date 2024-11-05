import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux';
import { StripeProvider } from '@stripe/stripe-react-native';
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
    <StripeProvider publishableKey="pk_test_51PuUKpByYkg6b0mSdkQatWHIXskQcksk7d1O0YNFx4YryNNLZwfOQ3S3oYs9bZFDQVZ7OzLlfdiYNt3ynKRO5D3Q00ab7aMsV0">
    <Provider store={Store}>
      <RootStackNavigation />
    </Provider>
    </StripeProvider>

  )
}

export default App

const styles = StyleSheet.create({})