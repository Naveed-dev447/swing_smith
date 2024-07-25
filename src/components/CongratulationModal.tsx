import {StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {useTheme} from '../theme/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../shared/Component/CustomButton';
import Button from './Button';

const CongratulationModal: React.FC = (props: any) => {
  const {route, navigation} = props;
  const {colors} = useTheme();
  const handlePress = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  const handleClose = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
      {/* <View style={styles.imageView}>
        <LottieView
          style={styles.image}
          source={require('../assets/animations/Plank.json')}
          autoPlay
          loop
        />
      </View> */}
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={require('../assets/Images/Drum.png')} // Replace with your actual image path
          resizeMode="contain"
        />
      </View>
      <Text style={styles.congratsText}>Congratulations!</Text>
      <Text style={styles.taskText}>Your task has been completed</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Thanks"
          onPress={handlePress}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default CongratulationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: hp('7%'),
    right: wp('7%'),
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: wp('8%'),
    color: '#192126',
  },
  // imageView: {
  //   flex:1,
  //   justifyContent:'center',
  //   marginTop: hp('10%'),
  // },
  // image: {
  //   width: wp('90%'),
  //   height: wp('50%'),
  // },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('20%'),
  },
  image: {
    width: wp('60%'),
    height: wp('60%'),
  },
  congratsText: {
    fontSize: wp('6%'),
    fontFamily: 'Outfit-Bold',
    color: '#192126',
  },
  taskText: {
    fontSize: wp('4%'),
    fontFamily: 'Outfit-Regular',
    marginVertical: 10,
    color: '#192126',
  },
  buttonContainer: {
    flex:1,
    width:'100%',
    justifyContent:'flex-end',
    alignItems: 'center',

  },
  button: {
    backgroundColor: '#C8FF49',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('30%'),
    borderRadius: wp('8%'),
  },
  buttonText: {
    color: '#192126',
    fontSize: wp('5%'),
    fontFamily: 'Inter-Bold',
  },
});
