import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';
import globalStyles from '../styles';
import { goBack } from '../../../shared/Utils/navigationRef';
import SelectedTouchableButton from '../../../components/SelectedTouchableButton';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { setEquipmentType } from '../../../redux/Slices/OnboardingSlice';

const schema = yup.object().shape({
  equipment: yup.string().required('Please select an equipment type'),
});

const EquipmentsView: React.FC = (props: any) => {
  const { route, navigation } = props;
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [dispatchSuccessful, setDispatchSuccessful] = useState(false);

  const equipmentOptions = [
    'Standard clubs',
    'Custom-fitted clubs',
    'Advanced technology clubs (e.g., smart clubs)'
  ];

  // const onSubmit = (data: { equipment: string }) => {
  //   // navigation.navigate('OnboardHome7');
  //   navigation.navigate('OnboardHome12');
  // };

  const onSubmit = (data: {equipment: string}) => {
    dispatch(setEquipmentType(data.equipment));
    console.log('Equipment type dispatched:', data.equipment);
    setDispatchSuccessful(true);
  };

  useEffect(() => {
    if (dispatchSuccessful) {
      navigation.navigate('OnboardHome12');
    }
  }, [dispatchSuccessful, navigation]);

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          What type of golf equipment do you primarily use?
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorded diagonally or from the back may result in
          lower accuracy
        </Text>
        <Controller
          control={control}
          name="equipment"
          render={({ field: { onChange } }) => (
            <View style={styles.equipmentContainer}>
              {equipmentOptions.map((option, index) => (
                <SelectedTouchableButton
                  key={index}
                  text={option}
                  isSelected={selectedEquipment === option}
                  onPress={() => {
                    setSelectedEquipment(option);
                    onChange(option);
                  }}
                  fullWidth={index === 2}
                />
              ))}
            </View>
          )}
        />
        {errors.equipment && <Text style={globalStyles.errorText}>{errors.equipment.message}</Text>}
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

export default EquipmentsView;

const styles = StyleSheet.create({
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
});
