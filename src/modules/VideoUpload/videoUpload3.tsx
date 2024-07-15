import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../Onboarding/styles';
import CustomHeader from '../../shared/Component/CustomHeader';
import CustomButton from '../../shared/Component/CustomButton';
import { goBack } from '../../shared/Utils/navigationRef';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SelectedTouchableButton from '../../components/SelectedTouchableButton';

const VideoUpload3: React.FC = (props: any) => {
  const { route, navigation } = props;
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  const equipmentOptions = [
    { text: 'Full swing', imageSource: require('../../assets/Images/Driver.png') },
    { text: 'Pitch', imageSource: require('../../assets/Images/Woods.png') },
    { text: 'Chip', imageSource: require('../../assets/Images/Irons.png') },
    { text: 'Putt', imageSource: require('../../assets/Images/Wedges.png') },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Which club were you using during the video?
        </Text>
        <Text style={styles.subTitle}>
          Analyzing video recorded diagonally or from the back may result in lower accuracy
        </Text>
        <View style={styles.equipmentContainer}>
          {equipmentOptions.map((option, index) => (
            <SelectedTouchableButton
              key={index}
              text={option.text}
              imageSource={option.imageSource}
              isSelected={selectedEquipment === option.text}
              onPress={() => setSelectedEquipment(option.text)}
            />
          ))}
        </View>
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton
          title="Next"
          onPress={() => navigation.navigate('OnboardHome11')}
        />
      </View>
    </View>
  );
};

export default VideoUpload3;

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
    color: '#192126',
    fontFamily: 'Outfit-Bold',
    fontSize: wp('6%'),
    marginVertical: hp('2%'),
  },
  subTitle: {
    color: '#192126',
    fontFamily: 'Outfit-Regular',
    fontSize: wp('4.2%'),
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
  },
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
});
