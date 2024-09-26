import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const GlobalButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
}) => {
  const handlePress = () => {
    if (!disabled && !loading) {
      const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      };
      ReactNativeHapticFeedback.trigger('impactLight', options);
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[title === 'Skip' ? styles.skipButton : styles.button, disabled || loading ? styles.buttonDisabled : {}]}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={loading ? "#000" : '#192126'} />
      ) : (
        <Text style={title === 'Skip' ? styles.skipButtonText : styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    padding: hp('2%'),
    borderRadius: wp('20%'),
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#BBF246',
    padding: hp('2%'),
    borderRadius: wp('20%'),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: wp('4%'),
  },
  skipButtonText: {
    color: '#000',
    fontFamily: 'Inter-SemiBold',
    fontSize: wp('4%'),
  },
  buttonDisabled: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1
  },
});

export default GlobalButton;
