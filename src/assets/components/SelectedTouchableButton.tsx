import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface SelectedTouchableButtonProps {
  text: string;
  iconName?: string;
  iconPosition?: 'left' | 'right';
  isSelected?: boolean;
  onPress: () => void;
}

const SelectedTouchableButton: React.FC<SelectedTouchableButtonProps> = ({
  text,
  iconName,
  iconPosition = 'left',
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected ? styles.selectedButton : null]}
      onPress={onPress}>
      {iconName && iconPosition === 'left' && (
        <Icon name={iconName} size={20} color="black" style={styles.iconLeft} /> 
      )}
      <Text style={styles.text}>{text}</Text>
      {iconName && iconPosition === 'right' && (
        <Icon
          name={iconName}
          size={20}
          color="black"
          style={styles.iconRight}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp('9%'),
    paddingHorizontal: hp('5.3%'),
    backgroundColor: '#f0f0f0',
    borderRadius: wp('2%'),
    margin: wp('1%'),
  },
  selectedButton: {
    backgroundColor: '#BBF246', // Change this to your desired selected color
  },
  text: {
    fontSize: wp('4%'),
  },
  iconLeft: {
    marginRight: wp('2%'),
  },
  iconRight: {
    marginLeft: wp('2%'),
  },
});

export default SelectedTouchableButton;
