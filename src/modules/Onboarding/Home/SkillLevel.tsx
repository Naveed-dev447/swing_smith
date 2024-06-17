import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CustomHeader from '../../../shared/Component/CustomHeader';
import {goBack} from '../../../shared/Utils/navigationRef';
import globalStyles from '../styles';
import CustomButton from '../../../shared/Component/CustomButton';

interface SkillLevelProps {
  navigation: any;
}

const SkillLevel: React.FC<SkillLevelProps> = ({navigation}) => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          What is your current handicap or skill level?
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorder diagonally or from the back may result in
          lower accuracy
        </Text>
        <View style={globalStyles.levelContainer}>
          {levels.map((level, index) => (
            <TouchableOpacity
              key={index}
              style={[
                globalStyles.levelButton,
                selectedLevel === level && globalStyles.selectedLevelButton,
              ]}
              onPress={() => setSelectedLevel(level)}>
              <Text
                style={[
                  globalStyles.levelText,
                  selectedLevel === level && globalStyles.selectedLevelText,
                ]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton
          title="Next"
          onPress={() => navigation.navigate('OnboardHome4')}
        />
      </View>
    </View>
  );
};

export default SkillLevel;
