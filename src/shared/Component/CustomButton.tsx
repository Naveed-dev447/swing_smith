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
  backgroundColor?: string;  // Optional prop to customize the background color
  textColor?: string;  // Optional prop to customize the text color
};

const GlobalButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  backgroundColor = '#000', // Default background color is black
  textColor = '#fff', // Default text color is white
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
      style={[
        title === 'Pay' || title.includes('total') ? styles.skipButton : styles.button,
        { backgroundColor }, // Use the backgroundColor prop
        disabled || loading ? styles.buttonDisabled : {},
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={loading ? '#000' : '#192126'} />
      ) : (
        <Text style={[title === 'Pay' || title.includes('total') ? styles.skipButtonText : styles.buttonText, { color: textColor }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: hp('2%'),
    borderRadius: wp('20%'),
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#BBF246', // Default color for skip button
    padding: hp('2%'),
    borderRadius: wp('20%'),
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: wp('4%'),
  },
  skipButtonText: {
    color: '#000', // Color for skip button text
    fontFamily: 'Inter-SemiBold',
    fontSize: wp('4%'),
  },
  buttonDisabled: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default GlobalButton;
