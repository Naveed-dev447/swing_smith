import React from 'react';
import { View, TextInput as RNTextInput, StyleSheet, Text, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  label?: string;
  error?: string;
  icon?: string;
  iconOnPress?: () => void;
}

const TextInput: React.FC<InputProps> = ({ containerStyle, inputStyle, label, error, icon, iconOnPress, ...props }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <RNTextInput style={[styles.input, inputStyle]} {...props} />
        {icon && (
          <Icon
            name={icon}
            size={20}
            color="#666"
            onPress={iconOnPress}
            style={styles.icon}
          />
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    // width:'100%'
  },
  label: {
    marginBottom: 5,
    color: '#6C7278',
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    width: wp('80%'),
    paddingHorizontal: 10
  },
  input: {
    fontFamily: 'Inter',
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  icon: {
    marginRight: 10,
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 12
  },
});

export default TextInput;
