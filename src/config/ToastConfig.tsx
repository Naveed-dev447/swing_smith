import React from 'react';
import { BaseToast, ToastConfig, BaseToastProps } from 'react-native-toast-message';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';


type ToastType = 'success' | 'error' | 'warning' | 'info';

const toastTypes: Record<ToastType, { backgroundColor: string; icon: string; textColor: string }> = {
  success: {
    backgroundColor: '#4CAF50', // Green
    icon: require('../assets/Images/success1.png'),
    textColor: '#FFFFFF',
  },
  error: {
    backgroundColor: '#F44336', // Red
    icon: require('../assets/Images/infoIcon.png'),
    textColor: '#FFFFFF',
  },
  warning: {
    backgroundColor: '#FF9800', // Orange
    icon: require('../assets/Images/warningIcon.png'),
    textColor: '#FFFFFF',
  },
  info: {
    backgroundColor: '#2B73B6', // Blue
    icon: require('../assets/Images/infoIcon.png'),
    textColor: '#FFFFFF'
  },
};

export const toastConfig: ToastConfig = {
  customToast: ({ text1, props }: BaseToastProps) => {
    const type = props?.type as ToastType;

    return (
      <View style={[styles.base, { backgroundColor: toastTypes[type].backgroundColor }]}>
        <Image source={toastTypes[type].icon} style={styles.iconImage} />
        <Text style={[styles.text1, { color: toastTypes[type].textColor }]}>{text1}</Text>
      </View>
    );
  },
};
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftColor: '#3498db',
    width: window.width * 0.95,
    height: window.height * 0.1,
    borderRadius: 8,

  },
  iconImage: {
    width: 28,
    height: 28,
    marginLeft: window.width * 0.04,
    marginRight: window.width * 0.05,
    tintColor: '#fff',
  },
  icon: {
    marginLeft: window.width * 0.04,
    marginRight: window.width * 0.05,
    fontSize: 25,
  },
  text1: {
    fontSize: 17,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
});
