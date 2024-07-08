import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, ImageSourcePropType, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface SelectedTouchableButtonProps {
  text: string;
  imageSource?: ImageSourcePropType;
  iconPosition?: 'left' | 'right';
  isSelected?: boolean;
  onPress: () => void;
  fullWidth?: boolean;
  backgroundImage?: ImageSourcePropType;
}

const SelectedTouchableButton: React.FC<SelectedTouchableButtonProps> = ({
  text,
  imageSource,
  iconPosition = 'left',
  isSelected = false,
  onPress,
  fullWidth = false, 
  backgroundImage,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected ? styles.selectedButton : null,
        fullWidth ? styles.fullWidthButton : null,
      ]}
      onPress={onPress}
    >
      {backgroundImage ? (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
          <Text style={styles.text}>{text}</Text>
        </ImageBackground>
      ) : (
        <>
          {imageSource && iconPosition === 'left' && (
            <Image source={imageSource} style={styles.iconTop} />
          )}
          <Text style={styles.text}>{text}</Text>
          {imageSource && iconPosition === 'right' && (
            <Image source={imageSource} style={styles.iconBottom} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: wp('5%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#f0f0f0',
    borderRadius: wp('3%'),
    margin: wp('2%'),
    width: wp('40%'),
    height: hp('12%'),
  },
  selectedButton: {
    backgroundColor: '#BBF246',
  },
  fullWidthButton: {
    width: '95%',
  },
  text: {
    fontFamily:'Outfit-Regular',
    fontSize: wp('4%'),
    marginLeft:'1%',
    color: '#192126',
    textAlign: 'center',
  },
  iconTop: {
    width: wp('7%'),
    height: hp('7%'),
    marginBottom: wp('2%'),
    resizeMode: 'contain',
  },
  iconBottom: {
    width: wp('7%'),
    height: hp('7%'),
    marginTop: wp('2%'),
    resizeMode: 'contain',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: wp('3%'), 
  },
});

export default SelectedTouchableButton;
