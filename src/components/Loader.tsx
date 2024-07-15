import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loaderIndicatorContainer}>
        <ActivityIndicator size="large" color="indigo" />
      </View>
    </View>
  );
}

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000040',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  loaderIndicatorContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
