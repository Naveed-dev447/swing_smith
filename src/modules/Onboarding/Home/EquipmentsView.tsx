import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';
import globalStyles from '../styles';
import {goBack} from '../../../shared/Utils/navigationRef';

const EquipmentsView: React.FC = (props: any) => {
  const {route, navigation} = props;
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
          Analyzing video recorder diagonally or from the back may result in
          lower accuracy
        </Text>
        <View style={globalStyles.equipmentContainer}>
          {equipmentOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                globalStyles.equipmentButton,
                selectedEquipment === option && globalStyles.selectedEquipmentButton
              ]}
              onPress={() => setSelectedEquipment(option)}
            >
              <Text
                style={[
                  globalStyles.equipmentText,
                  selectedEquipment === option && globalStyles.selectedEquipmentText
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
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
