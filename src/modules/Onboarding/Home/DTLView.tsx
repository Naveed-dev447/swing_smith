import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';
import globalStyles from '../styles';
import { goBack } from '../../../shared/Utils/navigationRef';

const DTLView: React.FC = (props: any) => {
  const { route, navigation } = props;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = ['Down the Line', 'Face On'];

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          Please select a video that is close to face on or DTL
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorder diagonally or from the back may result in lower accuracy
        </Text>
        <View style={globalStyles.dtlOptionContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                globalStyles.dtlOptionButton,
                selectedOption === option && globalStyles.selectedOptionButton
              ]}
              onPress={() => setSelectedOption(option)}
            >
              <Text
                style={[
                  globalStyles.optionText,
                  selectedOption === option && globalStyles.dtlSelectedOptionText
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Image
          source={require('../../../assets/Images/DTL.png')}
          style={globalStyles.golferImage}
        />
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton
          title="Next"
          onPress={() => navigation.navigate('OnboardHome8')}
        />
      </View>
    </View>
  );
};

export default DTLView;
