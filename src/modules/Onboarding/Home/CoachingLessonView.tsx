import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';
import globalStyles from '../styles';
import { goBack } from '../../../shared/Utils/navigationRef';

const CoachingLessonView: React.FC = (props: any) => {
  const { route, navigation } = props;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    'Yes, regularly',
    'Yes, occasionally',
    'No, but I have in the past',
    'No, never'
  ];

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          Do you currently work with a golf coach or take lessons?
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorder diagonally or from the back may result in lower accuracy
        </Text>
        <View style={globalStyles.optionContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                globalStyles.optionButton,
                selectedOption === option && globalStyles.selectedOptionButton
              ]}
              onPress={() => setSelectedOption(option)}
            >
              <Icon 
                name="check-circle" 
                size={24} 
                color={selectedOption === option ? 'black' : 'white'} 
                style={globalStyles.optionIcon} 
              />
              <Text
                style={[
                  globalStyles.optionText,
                  selectedOption === option && globalStyles.selectedOptionText
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
          onPress={() => navigation.navigate('OnboardHome6')}
        />
      </View>
    </View>
  );
};

export default CoachingLessonView;
