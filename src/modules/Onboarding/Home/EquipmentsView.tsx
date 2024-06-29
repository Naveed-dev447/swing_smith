import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';
import globalStyles from '../styles';
import { goBack } from '../../../shared/Utils/navigationRef';
import SelectedTouchableButton from '../../../components/SelectedTouchableButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EquipmentsView: React.FC = (props: any) => {
  const { route, navigation } = props;
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  const equipmentOptions = [
    'Standard clubs',
    'Custom-fitted clubs',
    'Advanced technology clubs (e.g., smart clubs)'
  ];

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          What type of golf equipment do you primarily use?
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorded diagonally or from the back may result in
          lower accuracy
        </Text>
        <View style={styles.equipmentContainer}>
          {equipmentOptions.map((option, index) => (
            <SelectedTouchableButton
              key={index}
              text={option}
              isSelected={selectedEquipment === option}
              onPress={() => setSelectedEquipment(option)}
              fullWidth={index === 2}
            />
          ))}
        </View>
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton
          title="Next"
          onPress={() => navigation.navigate('OnboardHome7')}
        />
      </View>
    </View>
  );
};

export default EquipmentsView;

const styles = StyleSheet.create({
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
});

