import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Image, ImageSourcePropType } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: ImageSourcePropType;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, buttonStyle, textStyle, disabled = false, icon }) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  disabledText: {
    color: '#666666',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default Button;
