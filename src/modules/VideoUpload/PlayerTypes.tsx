import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomHeader from '../../shared/Component/CustomHeader';
import { goBack } from '../../shared/Utils/navigationRef';
import globalStyles from '../Onboarding/styles';
import CustomButton from '../../shared/Component/CustomButton';
import SelectedTouchableButton from '../../components/SelectedTouchableButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
interface SkillLevelProps {
  navigation: any;
}

const schema = yup.object().shape({
  playerType: yup.string().required('Please select a contact level'),
});

const PlayerTypes: React.FC<SkillLevelProps> = (props: any) => {
  const { navigation, route } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { skillLevel } = useSelector((state: RootState) => state.onboarding);

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const beginnerLevel = ['Solid', 'Poor'];
  const otherLevel = ['Toe', 'Heel', 'Fat', 'Thin', 'Center'];
  const levels = skillLevel === 'Beginner' ? beginnerLevel : otherLevel;

  let data = {
    "contact": selectedLevel,
    "ball_flight": "",
  }
  const onSubmit = () => {
    if (skillLevel === 'Beginner') {
      navigation.navigate('OnboardHome13', data)
    }
    else {
      navigation.navigate('ballFlightType', selectedLevel)
    }

  };


  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          What is your current Contact level?
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorded diagonally or from the back may result in
          lower accuracy
        </Text>
        <Controller
          control={control}
          name="playerType"
          render={({ field: { onChange } }) => (
            <View style={styles.levelContainer}>
              {levels.map((level, index) => (
                <SelectedTouchableButton
                  key={index}
                  text={level}
                  isSelected={selectedLevel === level}
                  onPress={() => {
                    setSelectedLevel(level);
                    onChange(level);
                  }}
                />
              ))}
            </View>
          )}
        />
        {errors.playerType && (
          <Text style={styles.errorText}>{errors.playerType.message}</Text>
        )}
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton title="Next" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default PlayerTypes;

const styles = StyleSheet.create({
  levelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
  errorText: {
    color: 'red',
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: hp('1%'),
  },
});
