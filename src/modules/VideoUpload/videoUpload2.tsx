import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import globalStyles from '../Onboarding/styles';
import CustomHeader from '../../shared/Component/CustomHeader';
import CustomButton from '../../shared/Component/CustomButton';
import { goBack } from '../../shared/Utils/navigationRef';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { setVideoHandedness } from '../../redux/Slices/OnboardingSlice';
const schema = yup.object().shape({
  option: yup.string().required('Please select an option'),
});

const VideoUpload2: React.FC = (props: any) => {
  const { route, navigation } = props;
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = ['Right Handed', 'Left Handed'];

  const onSubmit = (data: { option: string }) => {
    dispatch(setVideoHandedness(data.option));
    console.log("Postion selection dispatched:", data.option)
    navigation.navigate('OnboardHome7');
  };

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
        Was this swing right handed or left handed?
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
                    selectedOption === option && styles.selectedEquipmentButton,
                  ]}
                  onPress={() => {
                    setSelectedOption(option);
                    onChange(option);
                  }}>
                  <Text
                    style={[
                      globalStyles.optionText,
                      selectedOption === option && styles.dtlSelectedOptionText,
                    ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
        {errors.option && <Text style={styles.errorText}>{errors.option.message}</Text>}
        <Image
          source={require('../../assets/Images/VideoUpload2.png')}
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

export default VideoUpload2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    marginTop: hp('3%'),
  },
  title: {
    color: '#192126',
    fontFamily: 'Outfit-Bold',
    fontSize: wp('6%'),
    marginVertical: hp('2%'),
  },
  subTitle: {
    color: '#192126',
    fontFamily: 'Outfit-Regular',
    fontSize: wp('4.2%'),
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
  },
  selectedEquipmentButton: {
    backgroundColor: '#ADFF2F',
  },
  dtlSelectedOptionText: {
    fontFamily: 'Outfit-Regular',
    color: '#192126',
    lineHeight: 22,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    color: 'red',
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: hp('1%'),
  },
});
