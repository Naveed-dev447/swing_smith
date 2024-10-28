import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from './Button';

interface CongratulationScreenProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  buttonText: string;
}

const CongratulationModal: React.FC<CongratulationScreenProps> = ({
  title,
  message,
  onConfirm,
  onClose,
  buttonText,
}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>

      <View style={styles.imageView}>
        <LottieView
          style={styles.image}
          source={require('../assets/animations/Drum1.json')}
          autoPlay
          loop={true}
        />
      </View>

      <Text style={styles.congratsText}>{title}</Text>
      <Text style={styles.taskText}>{message}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title={buttonText}
          onPress={onConfirm}
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
    // padding: 20,
    // Removed justifyContent: 'space-between'
    // Instead, use padding to keep the button at the bottom
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
  imageView: {
    alignSelf: 'center',
    marginTop: hp('31%'),
    width: wp('90%'),
    height: hp('24%'),
  },
  image: {
    width: wp('90%'),
    height: hp('28%'),
  },
  congratsText: {
    fontSize: wp('6%'),
    fontFamily: 'Outfit-Bold',
    color: '#192126',
    textAlign: 'center'
  },
  taskText: {
    fontSize: wp('4%'),
    fontFamily: 'Outfit-Regular',
    marginVertical: 12,
    color: '#192126',
    alignSelf: 'center',
    width: wp('80%'),
    textAlign: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    paddingBottom: hp('5%'),
    position: 'absolute',
    bottom: 20,
  },
  button: {
    backgroundColor: '#BBF246',
    paddingVertical: hp('1.8%'),
    width: wp('90%'),
    borderRadius: wp('8%'),
  },
  buttonText: {
    color: '#192126',
    fontSize: wp('5%'),
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
  },
});
