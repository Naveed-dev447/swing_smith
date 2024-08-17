import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../shared/Component/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CommonActions } from '@react-navigation/native';

const VideoUpload1: React.FC = (props: any) => {
  const { route, navigation } = props;


  const handleSkip = () => {
    navigation.navigate('OnboardHome13');
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/onBoarding.jpg')}
      style={styles.backgroundImage}>
      <LinearGradient
        colors={['#19212666', '#BBF24666']}
        locations={[0.4, 1]}
        style={styles.gradient}>
        <View style={styles.container}>
          <TouchableOpacity>
          </TouchableOpacity>
          <Text style={styles.centerText}>
            Upon answering a few questions, you’ll receive a more accurate
            analysis.
          </Text>
          <View>
            <CustomButton
              title="Next"
              onPress={() => navigation.navigate('clubType')}
            />
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default VideoUpload1;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: wp('100%'),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: wp('100%'),
    padding: wp('5%'),
    justifyContent: 'space-between',
  },
  skipText: {
    alignSelf: 'flex-end',
    color: '#FFFFFF',
    fontFamily: 'Outfit-Regular',
    marginTop: hp('6%'),
    marginRight: wp('2.5%'),
  },
  centerText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Outfit-Bold',
    fontSize: wp('7.5%'),
  },
  nextButton: {
    backgroundColor: 'black',
    borderRadius: wp('5%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    alignSelf: 'center',
    marginBottom: hp('3%'),
  },
  nextButtonText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});
