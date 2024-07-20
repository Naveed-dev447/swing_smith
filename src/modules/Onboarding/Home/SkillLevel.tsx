import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import CustomHeader from '../../../shared/Component/CustomHeader';
import {goBack} from '../../../shared/Utils/navigationRef';
import globalStyles from '../styles';
import CustomButton from '../../../shared/Component/CustomButton';
import SelectedTouchableButton from '../../../components/SelectedTouchableButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {setSkillLevel} from '../../../redux/Slices/OnboardingSlice';
interface SkillLevelProps {
  navigation: any;
}

const schema = yup.object().shape({
  skillLevel: yup.string().required('Please select a skill level'),
});

const SkillLevel: React.FC<SkillLevelProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [dispatchSuccessful, setDispatchSuccessful] = useState(false);
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

  // const onSubmit = (data: {skillLevel: string}) => {
  //   console.log('skill level:', data);
  //   dispatch(setSkillLevel(data.skillLevel));
  //   console.log('Skill level dispatched successfully:', data.skillLevel);
  //   navigation.navigate('OnboardHome4');
  // };
  const onSubmit = (data: { skillLevel: string }) => {
    console.log('Submitted skill level:', data.skillLevel);
    dispatch(setSkillLevel(data.skillLevel));
    console.log('Skill level dispatched:', data.skillLevel);
    setDispatchSuccessful(true);
  };

  useEffect(() => {
    if (dispatchSuccessful) {
      navigation.navigate('OnboardHome4');
    }
  }, [dispatchSuccessful, navigation]);

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
        <Controller
          control={control}
          name="skillLevel"
          render={({field: {onChange}}) => (
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
        {errors.skillLevel && (
          <Text style={styles.errorText}>{errors.skillLevel.message}</Text>
        )}
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton title="Next" onPress={handleSubmit(onSubmit)} />
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
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginLeft: 10,
    fontSize: wp('3.5%'),
    marginTop: hp('1%'),
  },
});
