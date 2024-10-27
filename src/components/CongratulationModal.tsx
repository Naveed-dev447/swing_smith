import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { useTheme } from '../theme/theme';
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
  const { colors } = useTheme();

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
    alignItems: 'center',
    marginTop: hp('25%'),
  },
  image: {
    width: wp('90%'),
    height: wp('60%'),
  },
  congratsText: {
    fontSize: wp('6%'),
    fontFamily: 'Outfit-Bold',
    color: '#192126',
    textAlign: 'center',
    marginTop: hp('2%'),
  },
  taskText: {
    fontSize: wp('4%'),
    fontFamily: 'Outfit-Regular',
    marginVertical: 15,
    color: '#192126',
    alignSelf: 'center',
    width: wp('80%'),
    textAlign: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    paddingBottom: hp('5%'), // Add padding to the bottom for spacing
    position: 'absolute', // Position the button container at the bottom
    bottom: 20, // Adjust this value as needed for spacing from the bottom
  },
  button: {
    backgroundColor: '#C8FF49',
    paddingVertical: hp('1.8%'),
    width: '90%', // Set width to 90%
    borderRadius: wp('8%'),
  },
  buttonText: {
    color: '#192126',
    fontSize: wp('5%'),
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
  },
});
