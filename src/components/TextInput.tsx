import React from 'react';
import { View, TextInput as RNTextInput, StyleSheet, Text, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/theme';

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  label?: string;
  error?: string;
  icon?: string;
  iconOnPress?: () => void;
}

const TextInput: React.FC<InputProps> = ({ containerStyle, inputStyle, label, error, icon, iconOnPress, ...props }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, { color:colors.textSecondary}]}>{label}</Text>}
      <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.background }]}>
        <RNTextInput 
          style={[styles.input, { color: colors.text }, inputStyle]}
          placeholderTextColor={colors.placeholder}
          {...props} 
        />
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={colors.text}
            onPress={iconOnPress}
            style={styles.icon}
          />
        )}
      </View>
      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
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
    height: hp('5.1%'),
    paddingHorizontal: wp('2%'),
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
