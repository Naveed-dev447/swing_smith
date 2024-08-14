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
import { useSelector } from 'react-redux';
import Progress from 'react-native-progress/Bar';
import { RootState } from 'redux/store';
import { IFormUpsert } from '../../../types/FormUpsert';
import formUpsertAPICall from './APICalls/FormUpsert';
import { useLoader } from '../../../config/LoaderContext'

const schema = yup.object().shape({
  equipment: yup.string().required('Please select an equipment type'),
});

const EquipmentsView: React.FC = (props: any) => {
  const { route, navigation } = props;
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { loading, setLoading } = useLoader();
  const { durationGolf, skillLevel, aspectToImprove, coachingLesson, practiceDuration, scoringAverage } = useSelector((state: RootState) => state.onboarding);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [dispatchSuccessful, setDispatchSuccessful] = useState(false);

  const equipmentOptions = [
    'Standard clubs',
    'Custom-fitted clubs',
    'Advanced technology clubs (e.g., smart clubs)'
  ];


  const onSubmit = async (data: { equipment: string }) => {
    try {
      const payload: IFormUpsert = {
        playing_since: durationGolf,
        practice_info: practiceDuration,
        skill_level: skillLevel,
        want_to_improve: aspectToImprove,
        have_coach: coachingLesson,
        equipment_use: data.equipment,
        content_medium: '' // Assuming this will be populated from another screen or a default value
      };
      setLoading(true);

      const response = await formUpsertAPICall(payload);
      console.log('Form Upsert API response:', response);

      setDispatchSuccessful(true);
    } catch (error) {
      console.error('Error in form upsert:', error);
    }
    finally {
      setLoading(false);
    }
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
          disabled={loading}
          loading={loading}
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
