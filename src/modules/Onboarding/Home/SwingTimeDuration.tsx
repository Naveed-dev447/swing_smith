import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomHeader from '../../../shared/Component/CustomHeader';
import { goBack } from '../../../shared/Utils/navigationRef';
import globalStyles from '../styles';
import CustomButton from '../../../shared/Component/CustomButton';
import SelectedTouchableButton from '../../../components/SelectedTouchableButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface TimeDurationProps {
  navigation: any;
}

const schema = yup.object().shape({
  swingTimeDuration: yup.string().required('Please select a Time Duration'),
});

const SwingTimeDuration: React.FC<TimeDurationProps> = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedTimeDuration, setSelectedTimeDuration] = useState<string | null>(null);
  const levels = ['Less than a year', '1-3 years', '4-6 years', '7+ years'];

  const onSubmit = (data: { swingTimeDuration: string }) => {
    console.log("Time Duration:",data)
    navigation.navigate('OnboardHome3');
  };

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
          name="swingTimeDuration"
          render={({ field: { onChange } }) => (
            <View style={styles.levelContainer}>
              {levels.map((level, index) => (
                <SelectedTouchableButton
                  key={index}
                  text={level}
                  isSelected={selectedTimeDuration === level}
                  onPress={() => {
                    setSelectedTimeDuration(level);
                    onChange(level);
                  }}
                />
              ))}
            </View>
          )}
        />
        {errors.swingTimeDuration && <Text style={styles.errorText}>{errors.swingTimeDuration.message}</Text>}
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton
          title="Next"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default SwingTimeDuration;

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
    marginLeft:10,
    fontSize: wp('3.5%'),
    marginTop: hp('1%'),
  },
});
