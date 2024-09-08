import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Image, ImageSourcePropType, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: ImageSourcePropType;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, buttonStyle, textStyle, disabled = false, icon, loading = false }) => {

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
      onPress={disabled || loading ? undefined : onPress}
      activeOpacity={disabled || loading ? 1 : 0.7}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={disabled ? "#666666" : '#fff'} />
      ) : (
        <>
          <Text style={[styles.text, textStyle, disabled && styles.disabledText]} numberOfLines={1} adjustsFontSizeToFit>{title}</Text>
          {icon && <Image source={icon} style={styles.icon} />}
        </>
      )}
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
    fontSize: 14,
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
    alignSelf: 'center',
    marginLeft: 10,
  },
});

export default Button;
