import { ToastAndroid, Alert, Platform } from 'react-native';

export const showToast = (message: string): void => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  } else {
    Alert.alert(message);
  }
};
