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
    <StripeProvider publishableKey="pk_test_51PttZGCNNJb7RDVDRYqLCUO1xWSeld5kVHmi9zklui0tW8Invk3E6xOwSTMLF65PzJrhRDhv9fVi0dbxvaLaK0i100bbzlqHjA">
    <Provider store={Store}>
      <RootStackNavigation />
    </Provider>
    </StripeProvider>

  )
}

export default App

const styles = StyleSheet.create({})