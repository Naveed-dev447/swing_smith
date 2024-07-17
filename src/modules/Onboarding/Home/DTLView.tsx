import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';
import globalStyles from '../styles';
import { goBack } from '../../../shared/Utils/navigationRef';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { setDtlSelectedOption } from '../../../redux/Slices/OnboardingSlice';
const schema = yup.object().shape({
  option: yup.string().required('Please select an option'),
});

const DTLView: React.FC = (props: any) => {
  const { route, navigation } = props;
  const { control, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = ['Down the Line', 'Face On'];

  const onSubmit = (data: { option: string }) => {
    dispatch(setDtlSelectedOption(data.option));
    console.log("Dtl selection dispatched:",data.option)
    navigation.navigate('OnboardHome9');   
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setValue('option', option);
    clearErrors('option');
  };

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
        <Controller
          control={control}
          name="option"
          render={({ field: { onChange } }) => (
            <View style={globalStyles.dtlOptionContainer}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    globalStyles.dtlOptionButton,
                    selectedOption === option && globalStyles.selectedOptionButton
                  ]}
                  onPress={() => handleOptionSelect(option)}
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
          )}
        />
        {errors.option && <Text style={styles.errorText}>{errors.option.message}</Text>}
        <Image
          source={require('../../../assets/Images/DTL.png')}
          style={globalStyles.golferImage}
        />
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

export default DTLView;

const styles = StyleSheet.create({
  errorText: {
    fontFamily: 'Poppins-Regular',
    color: 'red',
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: hp('1%'),
  },
});
