import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {useTheme} from '../theme/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../shared/Component/CustomButton';

const CongratulationModal: React.FC = (props: any) => {
  const {route, navigation} = props;
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <LottieView
          style={styles.image}
          source={require('../assets/animations/Drum1.json')}
          autoPlay
          loop
        />
      </View>
      <Text style={[styles.congratsText, {color: colors.headingText}]}>
        Congratulations!
      </Text>
      <Text style={[styles.taskText, {color: colors.textSecondary}]}>
        Your task has been completed
      </Text>
      <View style={styles.buttonContainer}>
        <CustomButton title="Thanks" onPress={() => navigation.navigate('')} />
      </View>
    </View>
  );
};

export default CongratulationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageView: {
    width: wp('90%'),
    height: wp('50%'),
    backgroundColor: '#F6FFE7',
    marginBottom: hp('2%'),
  },
  image: {
    width: wp('90%'),
    height: wp('50%'),
  },
  congratsText: {
    fontSize: wp('6%'),
    fontFamily: 'Inter-Bold',
    marginTop: 20,
  },
  taskText: {
    fontSize: wp('4%'),
    fontFamily: 'Inter-Regular',
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
