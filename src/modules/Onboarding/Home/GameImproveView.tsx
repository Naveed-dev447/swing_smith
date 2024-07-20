import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';
import globalStyles from '../styles';
import { goBack } from '../../../shared/Utils/navigationRef';
import SelectedTouchableButton from '../../../components/SelectedTouchableButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { setAspectToImprove } from '../../../redux/Slices/OnboardingSlice';

const schema = yup.object().shape({
  aspect: yup.string().required('Please select an aspect to improve'),
});

const GameImproveView: React.FC = (props: any) => {
  const { route, navigation } = props;
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const [selectedAspect, setSelectedAspect] = useState<string | null>(null);
  const [dispatchSuccessful, setDispatchSuccessful] = useState(false);

  const aspects = ['Driving', 'Iron play', 'Putting', 'Short game', 'Course management'];

  // const onSubmit = (data: { aspect: string }) => {
  //   dispatch(setAspectToImprove(data.aspect));
  //   console.log('Aspect to improve dispatched:', data.aspect);
  //   navigation.navigate('OnboardHome5');
  // };

  const onSubmit = (data: { aspect: string }) => {
    dispatch(setAspectToImprove(data.aspect));
    console.log('Aspect to improve dispatched:', data.aspect);
    setDispatchSuccessful(true);
  };

  useEffect(() => {
    if (dispatchSuccessful) {
      navigation.navigate('OnboardHome5');
    }
  }, [dispatchSuccessful, navigation]);

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          What aspect of your game do you want to improve the most?
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorded diagonally or from the back may result in
          lower accuracy
        </Text>
        <Controller
          control={control}
          name="aspect"
          render={({ field: { onChange } }) => (
            <View style={styles.aspectContainer}>
              {aspects.map((aspect, index) => (
                <SelectedTouchableButton
                  key={index}
                  text={aspect}
                  isSelected={selectedAspect === aspect}
                  onPress={() => {
                    setSelectedAspect(aspect);
                    onChange(aspect);
                  }}
                  fullWidth={index === aspects.length - 1} 
                />
              ))}
            </View>
          )}
        />
        {errors.aspect && <Text style={styles.errorText}>{errors.aspect.message}</Text>}
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

export default GameImproveView;

const styles = StyleSheet.create({
  aspectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    color: 'red',
    textAlign: 'center',
    fontSize: wp('3%'),
    marginLeft:10,
    marginTop: hp('1%'),
  },
});
