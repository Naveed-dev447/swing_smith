import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../Onboarding/styles';
import CustomHeader from '../../shared/Component/CustomHeader';
import CustomButton from '../../shared/Component/CustomButton';
import { goBack } from '../../shared/Utils/navigationRef';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SelectedTouchableButton from '../../components/SelectedTouchableButton';

const videoUpload4: React.FC = (props: any) => {
  const { route, navigation } = props;
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  const equipmentOptions = [
    { text: 'Full swing', backgroundImage: require('../../assets/Images/Chip.png') },
    { text: 'Pitch', backgroundImage: require('../../assets/Images/Chip.png') },
    { text: 'Chip', backgroundImage: require('../../assets/Images/Chip.png') },
    { text: 'Putt', backgroundImage: require('../../assets/Images/Chip.png') },
  ];

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          What type of swing is in the video?
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorded diagonally or from the back may result in lower accuracy
        </Text>
        <View style={styles.equipmentContainer}>
          {equipmentOptions.map((option, index) => (
            <SelectedTouchableButton
              key={index}
              text={option.text}
              backgroundImage={option.backgroundImage}
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

export default videoUpload4;

const styles = StyleSheet.create({
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
});
