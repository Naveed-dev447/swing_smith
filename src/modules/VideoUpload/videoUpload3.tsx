import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../Onboarding/styles';
import CustomHeader from '../../shared/Component/CustomHeader';
import CustomButton from '../../shared/Component/CustomButton';
import { goBack } from '../../shared/Utils/navigationRef';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SelectedTouchableButton from '../../assets/components/SelectedTouchableButton';

const videoUpload3: React.FC = (props: any) => {
  const { route, navigation } = props;
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  const equipmentOptions = [
    { text: 'Full swing', imageSource: require('../../assets/Images/Driver.png') },
    { text: 'Pitch', imageSource: require('../../assets/Images/Woods.png') },
    { text: 'Chip', imageSource: require('../../assets/Images/Irons.png') },
    { text: 'Putt', imageSource: require('../../assets/Images/Wedges.png') },
  ];

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          Which club were you using during the video?
        </Text>
        <Text style={globalStyles.subTitle}>
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

export default videoUpload3;

const styles = StyleSheet.create({
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
});
