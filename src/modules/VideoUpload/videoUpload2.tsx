import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import globalStyles from '../Onboarding/styles';
import CustomHeader from '../../shared/Component/CustomHeader';
import CustomButton from '../../shared/Component/CustomButton';
import {goBack} from '../../shared/Utils/navigationRef';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const VideoUpload2: React.FC = (props: any) => {
  const {route, navigation} = props;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = ['Right Handed', 'Left Handed'];

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Make sure your swing angle and Headedness is in correct position{' '}
        </Text>
        <Text style={styles.subTitle}>
          Check out the example image below on how to set your camera ( Set up
          using me the back camera ){' '}
        </Text>
        <View style={globalStyles.dtlOptionContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                globalStyles.dtlOptionButton,
                selectedOption === option && styles.selectedEquipmentButton,
              ]}
              onPress={() => setSelectedOption(option)}>
              <Text
                style={[
                  globalStyles.optionText,
                  selectedOption === option &&
                  styles.dtlSelectedOptionText,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Image
          source={require('../../assets/Images/VideoUpload2.png')}
          style={globalStyles.golferImage}
        />
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton
          title="Next"
          onPress={() => navigation.navigate('OnboardHome10')}
        />
      </View>
    </View>
  );
};

export default VideoUpload2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    marginTop: hp('3%'),
  },
  title: {
    color: '#000',
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#192126',
    fontSize: wp('4.2%'),
    fontWeight: '400',
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
  },
    selectedEquipmentButton: {
        backgroundColor: '#192126',
      },
      dtlSelectedOptionText: {
        fontWeight: '400',
        color:'#ffff',
        lineHeight:22,
        fontSize:15,
      },
  });