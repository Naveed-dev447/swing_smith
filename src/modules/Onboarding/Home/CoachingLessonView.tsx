import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';
import globalStyles from '../styles';
import { goBack } from '../../../shared/Utils/navigationRef';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  aspect: yup.string().required('Please select an option'),
});

const CoachingLessonView: React.FC = (props: any) => {
  const { route, navigation } = props;
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    'Yes, regularly',
    'Yes, occasionally',
    'No, but I have in the past',
    'No, never'
  ];
  const onSubmit = (data: { aspect: string }) => {
    navigation.navigate('OnboardHome6');
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          Do you currently work with a golf coach or take lessons?
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorded diagonally or from the back may result in lower accuracy
        </Text>
        <Controller
          control={control}
          name="aspect"
          render={({ field: { onChange } }) => (
            <View style={globalStyles.optionContainer}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    globalStyles.optionButton,
                    selectedOption === option && globalStyles.selectedOptionButton
                  ]}
                  onPress={() => {
                    setSelectedOption(option);
                    onChange(option);
                  }}
                >
                  <Icon 
                    name="check-circle" 
                    size={24} 
                    color={selectedOption === option ? 'black' : 'white'} 
                    style={globalStyles.optionIcon} 
                  />
                  <Text
                    style={[
                      globalStyles.optionText,
                      selectedOption === option && globalStyles.selectedOptionText
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
        {errors.aspect && <Text style={globalStyles.errorText}>{errors.aspect.message}</Text>}
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

export default CoachingLessonView;
