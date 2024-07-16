import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import RootStackNavigation from './src/navigation/RootStack'
import Store from './src/redux/Store';

const App: React.FC = () => {
  return (
    <Provider store={Store}>
     <RootStackNavigation/>
     </Provider>
  )
}

export default App

const styles = StyleSheet.create({})