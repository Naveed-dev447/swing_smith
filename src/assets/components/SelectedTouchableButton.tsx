import React from 'react';
import {TouchableOpacity, Text, StyleSheet,Image, ImageSourcePropType} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface SelectedTouchableButtonProps {
  text: string;
  imageSource?: ImageSourcePropType;
  iconPosition?: 'left' | 'right';
  isSelected?: boolean;
  onPress: () => void;
}

const SelectedTouchableButton: React.FC<SelectedTouchableButtonProps> = ({
  text,
  imageSource,
  iconPosition = 'left',
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected ? styles.selectedButton : null]}
      onPress={onPress}>
       {imageSource && iconPosition === 'left' && (
        <Image source={imageSource} style={styles.iconLeft} />
      )}
      <Text style={styles.text}>{text}</Text>
      {imageSource && iconPosition === 'right' && (
        <Image source={imageSource} style={styles.iconRight} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp('6%'),
    paddingHorizontal: hp('5.8%'),
    backgroundColor: '#f0f0f0',
    borderRadius: wp('2%'),
    margin: wp('1%'),
  },
  selectedButton: {
    backgroundColor: '#BBF246', 
  },
  text: {
    fontSize: wp('4%'),
    color:'#192126',
  },
  iconLeft: {
    width: wp('5%'), 
    height: hp('4%'),
    marginRight: wp('2%'),
    resizeMode: 'contain',
  },
  iconRight: {
    width: wp('5%'),
    height: hp('5%'),
    marginLeft: wp('2%'),
    resizeMode: 'contain',
  },
});

export default SelectedTouchableButton;
