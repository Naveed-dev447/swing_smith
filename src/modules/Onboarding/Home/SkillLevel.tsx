import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../../../shared/Component/CustomHeader';
import { goBack } from '../../../shared/Utils/navigationRef';
import globalStyles from '../styles';
import CustomButton from '../../../shared/Component/CustomButton';
import SelectedTouchableButton from '../../../assets/components/SelectedTouchableButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface SkillLevelProps {
  navigation: any;
}

const SkillLevel: React.FC<SkillLevelProps> = ({ navigation }) => {
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
          Analyzing video recorded diagonally or from the back may result in
          lower accuracy
        </Text>
        <View style={styles.levelContainer}>
          {levels.map((level, index) => (
            <SelectedTouchableButton
              key={index}
              text={level}
              isSelected={selectedLevel === level}
              onPress={() => setSelectedLevel(level)}
            />
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

const styles = StyleSheet.create({
  levelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
});
