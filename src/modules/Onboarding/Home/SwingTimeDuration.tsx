import React, {useState} from 'react';
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
import { setDurationGolf } from '../../../redux/Slices/OnboardingSlice';
import { useDispatch } from 'react-redux';

interface TimeDurationProps {
  navigation: any;
}

const schema = yup.object().shape({
  swingTimeDuration: yup.string().required('Please select a Time Duration'),
});

const SwingTimeDuration: React.FC<TimeDurationProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedTimeDuration, setSelectedTimeDuration] = useState<string>('');
  const levels = ['Daily', 'Several times a week', 'Once a week', 'A few times a month'];

  const onSubmit = () => {
    dispatch(setDurationGolf(selectedTimeDuration));
    console.log("duration", selectedTimeDuration);
    
     navigation.navigate('OnboardHome3');
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
        How often do you practice your golf swing?
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorded diagonally or from the back may result in
          lower accuracy
        </Text>
        <Controller
          control={control}
          name="swingTimeDuration"
          render={({field: {onChange}}) => (
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
        {errors.swingTimeDuration && (
          <Text style={styles.errorText}>
            {errors.swingTimeDuration.message}
          </Text>
        )}
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton title="Next" onPress={handleSubmit(onSubmit)} />
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
   fontFamily: 'Poppins-Regular',
    color: 'red',
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: hp('1%'),
  },
});
